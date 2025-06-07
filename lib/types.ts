export type Command = {
  aliases: string[];
  description: string;
  usage: string;
  usages: {
    usage: string;
    description: string;
  }[];
};

export type CommandData = Record<string, Command>;

export type Permission = {
  description: string;
  default: 'op' | 'noop' | boolean;
  children: Record<string, boolean>;
};

export type PermissionData = Record<string, Permission>;
