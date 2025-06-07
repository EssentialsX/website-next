import { MDXComponents } from 'mdx/types';
import Link from 'next/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: props => {
      const { href, children, ...other } = props;
      const isInternalLink =
        href && (href.startsWith('/') || href.startsWith('#'));

      if (isInternalLink) {
        return (
          <Link href={href} {...other}>
            {children}
          </Link>
        );
      }

      return (
        <a href={href} {...other}>
          {children}
        </a>
      );
    },
    ...components,
  };
}
