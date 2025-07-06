export default function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string | undefined;
}) {
  return (
    <section
      style={{ backgroundColor: 'var(--mantine-color-red-filled)' }}
      className='px-12 py-12'
    >
      <div className='mx-auto max-w-6xl text-white'>
        <h1 className='mb-2 text-3xl font-bold md:text-4xl'>{title}</h1>
        {description !== undefined && <p className='text-lg'>{description}</p>}
      </div>
    </section>
  );
}
