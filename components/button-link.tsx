'use client';

import { Button, type ButtonProps } from '@mantine/core';
import Link from 'next/link';
import type { ComponentProps } from 'react';

type ButtonLinkProps = ButtonProps &
  Omit<ComponentProps<typeof Link>, keyof ButtonProps>;

export default function ButtonLink(props: ButtonLinkProps) {
  return <Button component={Link} {...props} />;
}
