'use server';

import { getCommands, getPermissions, getVersionData } from '@/lib/cloudflare';

export async function fetchPermissions() {
  return getPermissions();
}

export async function fetchCommands() {
  return getCommands();
}

export async function fetchVersionData() {
  return getVersionData();
}
