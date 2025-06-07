import { motion } from 'framer-motion';

export default function PermissionSet({
  childrenPerms,
}: {
  childrenPerms: [string, boolean][];
}) {
  const formatDefault = (value: 'op' | 'noop' | boolean) => {
    switch (value) {
      case 'op':
        return 'Operators';
      case 'noop':
        return 'Everyone but Operators';
      case true:
        return 'Everyone';
      case false:
        return 'Nobody';
      default:
        return String(value);
    }
  };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0, marginBottom: 0 }}
      animate={{
        height: 'auto',
        opacity: 1,
        marginBottom: 16,
        transition: {
          height: { duration: 0.4, ease: 'easeInOut' },
          opacity: { duration: 0.3, ease: 'easeInOut' },
          marginBottom: { duration: 0.4, ease: 'easeInOut' },
        },
      }}
      exit={{
        height: 0,
        opacity: 0,
        marginBottom: 0,
        transition: {
          height: { duration: 0.3, ease: 'easeInOut' },
          opacity: { duration: 0.2, ease: 'easeInOut' },
          marginBottom: { duration: 0.3, ease: 'easeInOut' },
        },
      }}
      className='overflow-hidden mb-10'
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
          className='prose dark:prose-invert bg-gray-100 dark:bg-[#1c1e22] rounded-lg p-4 w-full max-w-none'
        >
          <h4 className='font-semibold mb-3 text-sm'>Child Permissions</h4>
          <div className='grid gap-3 sm:grid-cols-2'>
            {childrenPerms.map(([child, val], idx) => (
              <motion.div
                key={child}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + idx * 0.1 }}
                className='space-y-1 prose dark:prose-invert'
              >
                <code className='text-xs bg-background px-2 py-1 rounded block transition-colors duration-200'>
                  {child}
                </code>
                <p className='text-xs pl-2'>
                  {val
                    ? 'Inherits parent permission'
                    : 'Inherits inverse of parent permission'}
                </p>
                <p className='text-xs pl-2'>Default: {formatDefault(val)}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
