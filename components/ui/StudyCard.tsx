interface StudyCardProps {
    content: string;
}

export default function StudyCard({
    content,
} : StudyCardProps) {
    return (
        <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-900 p-12 shadow-xl">
            <h2 className="text-center text-3xl font-bold leading-relaxed">
                {content}
            </h2>
        </div>
    )
}