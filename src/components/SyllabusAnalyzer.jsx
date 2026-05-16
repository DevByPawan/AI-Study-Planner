import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc =
    `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function SyllabusAnalyzer() {

    const [topics, setTopics] = useState([]);

    const extractTopics = (text) => {

        const words = text
            .replace(/[^a-zA-Z ]/g, "")
            .toLowerCase()
            .split(/\s+/);

        const stopWords = [
            "the", "is", "and", "of", "to", "in",
            "for", "a", "an", "on", "with", "by"
        ];

        const frequency = {};

        words.forEach((word) => {

            if (word.length > 4 && !stopWords.includes(word)) {
                frequency[word] = (frequency[word] || 0) + 1;
            }

        });

        const sortedTopics = Object.entries(frequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map((item) => item[0]);

        setTopics(sortedTopics);

    };

    const handleFileUpload = async (e) => {

        const file = e.target.files[0];

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

            extractTopics(fullText);

        };

        reader.readAsArrayBuffer(file);

    };

    return (

        <div className="bg-slate-800 p-5 rounded-xl mt-6 mb-8">

            <h2 className="text-white text-xl font-bold mb-4">
                AI Syllabus Analyzer
            </h2>

            <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="text-white mb-4"
            />

            <div className="mt-4">

                <h3 className="text-cyan-400 font-semibold mb-2">
                    Important Topics
                </h3>

                <div className="flex flex-wrap gap-2">

                    {topics.map((topic, index) => (

                        <span
                            key={index}
                            className="bg-cyan-600 text-white px-3 py-1 rounded-lg"
                        >
                            {topic}
                        </span>

                    ))}

                </div>

            </div>

        </div>

    );

}

export default SyllabusAnalyzer;