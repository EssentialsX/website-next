export type GistFile = {
  content: string;
  filename: string;
  type: string;
  language: string | null;
  raw_url: string;
  size: number;
  truncated: boolean;
};

export type GistResponse = {
  files: Record<string, GistFile>;
};

export type DumpPaste = {
  files: DumpFile[];
};

export type DumpFile = {
  name: string;
  content: {
    format: string;
    value: string;
  };
};

export type DumpPlugin = {
  name: string;
  version: string;
  description: string;
  main: string;
  enabled: boolean;
  official: boolean;
  unsupported: boolean;
  authors: string[];
};

export type DumpData = {
  meta: {
    timestamp: number;
    sender: string;
    senderUuid: string;
  };
  'server-data': {
    'bukkit-version': string;
    'server-version': string;
    'server-brand': string;
    'online-mode': string;
    'support-status': {
      status: string;
      supported: boolean;
      trigger: string | null;
    };
  };
  environment: {
    'java-version': string;
    'operating-system': string;
    uptime: string;
    'allocated-memory': string;
  };
  'ess-data': {
    version: string;
    'update-data': {
      id: string;
      branch: string;
      dev: boolean;
    };
    'economy-layer': {
      enabled: boolean;
      'selected-layer': string;
      name: string;
      'layer-version': string;
      'backend-name': string;
    };
    addons: DumpPlugin[];
  };
  plugins: DumpPlugin[];
};
