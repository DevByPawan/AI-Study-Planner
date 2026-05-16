import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import { Upload, FileText } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;


function SyllabusAnalyzer() {
    const genAI = new GoogleGenerativeAI(
        import.meta.env.VITE_GEMINI_API_KEY
    );
    const [topics, setTopics] = useState([]);
    const [fileName, setFileName] = useState("");
    const [loading, setLoading] = useState(false);
    const [roadmap, setRoadmap] = useState([]);

    const extractTopics = async (text) => {

        try {

            const model = genAI.getGenerativeModel({
                model: "gemini-2.0-flash"
            });

            const prompt = `
    Analyze this syllabus and extract:
    - important topics
    - high priority concepts
    - exam focused topics

    Return ONLY topic names separated by commas.

    Syllabus:
    ${text}
    `;

            const result = await model.generateContent(prompt);

            const response = await result.response.text();
            console.log(response);

            const extractedTopics = response
                .split(",")
                .map(topic => topic.trim())
                .filter(topic => topic.length > 0);

            setTopics(extractedTopics);
            generateRoadmap(extractedTopics);
            setLoading(false);

        }

        catch (error) {

            console.error(error);

            const techKeywords = [
                "algorithm",
                "database",
                "network",
                "operating system",
                "compiler",
                "machine learning",
                "artificial intelligence",
                "search",
                "tree",
                "graph",
                "heuristic",
                "consistency",
                "admissibility",
                "optimization",
                "recursion",
                "dynamic programming",
                "stack",
                "queue",
                "array",
                "linked list",
                "sorting",
                "searching",
                "hashing",
                "cpu",
                "process",
                "thread",
                "deadlock",
                "normalization",
                "sql",
                "tcp",
                "ip",
                "encryption"
            ];

            const lowerText = text.toLowerCase();

            // Detect important CSE keywords
            const detectedTopics = techKeywords.filter(topic =>
                lowerText.includes(topic.toLowerCase())
            );

            // Frequency analysis fallback
            const words = lowerText
                .replace(/[^a-zA-Z ]/g, "")
                .split(/\s+/);

            const stopWords = [
                "the", "is", "and", "of", "to", "in",
                "for", "a", "an", "on", "with", "by",
                "that", "this", "from", "are", "was",
                "were", "into", "their", "using"
            ];

            const frequency = {};

            words.forEach((word) => {

                if (
                    word.length > 5 &&
                    !stopWords.includes(word)
                ) {
                    frequency[word] = (frequency[word] || 0) + 1;
                }

            });

            const frequentTopics = Object.entries(frequency)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(item =>
                    item[0]
                        .charAt(0)
                        .toUpperCase() +
                    item[0].slice(1)
                );

            // Merge + remove duplicates
            const finalTopics = [
                ...new Set([
                    ...detectedTopics.map(topic =>
                        topic
                            .split(" ")
                            .map(word =>
                                word.charAt(0).toUpperCase() +
                                word.slice(1)
                            )
                            .join(" ")
                    ),
                    ...frequentTopics
                ])
            ];

            setTopics(finalTopics);
            generateRoadmap(finalTopics);
            setLoading(false);

        }

    };
    const generateRoadmap = (topicsList) => {

        const roadmapData = topicsList.map((topic, index) => {

            return {
                day: `Day ${index + 1}`,
                topic: topic
            };

        });

        setRoadmap(roadmapData);

    };
    const handleFileUpload = async (e) => {

        const file = e.target.files[0];
        setFileName(file.name);
        setLoading(true);

        if (!file) return;

        const reader = new FileReader();

        reader.onload = async function () {

            const typedArray = new Uint8Array(this.result);

            const pdf = await pdfjsLib.getDocument(typedArray).promise;

            let fullText = "";

            for (let i = 1; i <= pdf.numPages; i++) {

                const page = await pdf.getPage(i);

                const content = await page.getTextContent();

                const strings = content.items.map(item => item.str);

                fullText += strings.join(" ");

            }

            await extractTopics(fullText);

        };

        reader.readAsArrayBuffer(file);

    };

    return (

        <div className="bg-[#1e293b] p-6 rounded-3xl mt-8 mb-8 shadow-xl">

            <h2 className="text-2xl font-bold text-white mb-6">
                AI Syllabus Analyzer
            </h2>

            <label className="border-2 border-dashed border-cyan-500 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-[#0f172a] transition">

                <Upload className="text-cyan-400 mb-4" size={40} />

                <p className="text-white font-semibold">
                    Drag & Drop PDF Here
                </p>

                <p className="text-gray-400 text-sm mt-2">
                    or click to upload
                </p>

                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                />

            </label>

            {fileName && (

                <div className="mt-4 flex items-center gap-3 bg-[#0f172a] p-4 rounded-2xl">

                    <FileText className="text-cyan-400" />

                    <p className="text-white">
                        {fileName}
                    </p>

                </div>

            )}

            {loading && (

                <div className="mt-6 text-cyan-400 animate-pulse">
                    AI is analyzing syllabus...
                </div>

            )}

            {topics.length > 0 && (

                <div className="mt-8">

                    <h3 className="text-cyan-400 font-semibold mb-4 text-lg">
                        Important Topics
                    </h3>

                    <div className="flex flex-wrap gap-3">

                        {topics.map((topic, index) => (

                            <span
                                key={index}
                                className="bg-cyan-600 text-white px-4 py-2 rounded-xl"
                            >
                                {topic}
                            </span>

                        ))}

                    </div>

                </div>

            )}
            {roadmap.length > 0 && (

                <div className="mt-10">

                    <h3 className="text-cyan-400 font-semibold mb-4 text-lg">
                        AI Study Roadmap
                    </h3>

                    <div className="space-y-4">

                        {roadmap.map((item, index) => (

                            <div
                                key={index}
                                className="bg-[#0f172a] p-4 rounded-2xl border border-cyan-500"
                            >

                                <p className="text-cyan-400 font-semibold">
                                    {item.day}
                                </p>

                                <p className="text-white mt-1">
                                    {item.topic}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            )}

        </div>

    )

}

export default SyllabusAnalyzer;