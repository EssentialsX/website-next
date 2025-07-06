import { motion } from 'framer-motion';

export default function CommandUsages({
  commandName,
  usages,
}: {
  commandName: string;
  usages: { usage: string; description: string }[];
}) {
  return (
    <motion.div
      initial={{
        height: 0,
        opacity: 0,
        marginBottom: 0,
      }}
      animate={{
        height: 'auto',
        opacity: 1,
        marginBottom: 16,
        transition: {
          height: {
            duration: 0.4,
            ease: 'easeInOut',
          },
          opacity: {
            duration: 0.3,
            ease: 'easeInOut',
          },
          marginBottom: {
            duration: 0.4,
            ease: 'easeInOut',
          },
        },
      }}
      exit={{
        height: 0,
        opacity: 0,
        marginBottom: 0,
        transition: {
          height: {
            duration: 0.3,
            ease: 'easeInOut',
          },
          opacity: {
            duration: 0.2,
            ease: 'easeInOut',
          },
          marginBottom: {
            duration: 0.3,
            ease: 'easeInOut',
          },
        },
      }}
      className='mb-10 overflow-hidden'
      style={{ transformOrigin: 'top' }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className='px-4'
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className='prose dark:prose-invert w-full max-w-none rounded-lg bg-gray-100 p-4 dark:bg-[#1c1e22]'
        >
          <h4 className='mb-3 text-sm font-semibold'>Usage Examples</h4>
          <div className='grid gap-3 sm:grid-cols-2'>
            {usages.map((usage, usageIndex) => (
              <motion.div
                key={usageIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.2 + usageIndex * 0.1,
                }}
                className='prose dark:prose-invert space-y-1'
              >
                <code className='bg-background block rounded px-2 py-1 text-xs transition-colors duration-200'>
                  /{commandName}
                  {usage.usage.slice(10)}
                </code>
                {usage.description && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.2,
                      delay: 0.3 + usageIndex * 0.1,
                    }}
                    className='pl-2 text-xs'
                  >
                    {usage.description}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
