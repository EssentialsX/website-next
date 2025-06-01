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
