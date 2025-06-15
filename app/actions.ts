'use server';

import { getCommands, getPermissions } from '@/lib/cloudflare';

export async function fetchPermissions() {
  return getPermissions();
}

export async function fetchCommands() {
  return getCommands();
}
