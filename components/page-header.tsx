export default function PageHeader({ title, description }: { title: string, description?: string | undefined }) {
    return (
        <section style={{backgroundColor: "var(--mantine-color-red-filled)"}} className="py-12 px-12">
            <div className="max-w-6xl mx-auto text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {title}
                </h1>
                {
                    description !== undefined && (
                        <p className="text-lg">
                            {description}
                        </p>
                    )
                }
            </div>
        </section>
    );

}
