'use client';

import { fetchVersionData } from '@/app/actions';
import {
  getCommitIdFromArtifact,
  getModuleIdFromArtifact,
  getVersionFromArtifact,
} from '@/lib/build-utils';
import { getDiscordMemberCount } from '@/lib/discord';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

type SharedData = {
  github: {
    stars: number;
    forks: number;
  };
  patreon: {
    patrons: number;
    sum: number;
  };
  discord: {
    members: number;
  };
  devBuild: BuildData | undefined;
  stableBuild: BuildData | undefined;
  downloads: number;
  activeVersion: string;
  legacyVersions: string[];
};

type BuildData = {
  version: string;
  commit?: string;
  build?: string;
  downloads: {
    core: string;
    chat: string;
    spawn: string;
    protect: string;
    discord: string;
    discordlink: string;
    geoip: string;
    antibuild: string;
    xmpp: string;
  };
};

export const SharedDataContext = createContext<SharedData | undefined>(
  undefined,
);

export const SharedDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [github, setGithubData] = useState({ stars: 0, forks: 0 });
  const [patreon, setPatreonData] = useState({ patrons: 0, sum: 0 });
  const [discord, setDiscordData] = useState({ members: 0 });
  const [devBuild, setDevBuild] = useState<BuildData | undefined>(undefined);
  const [stableBuild, setStableBuild] = useState<BuildData | undefined>(
    undefined,
  );
  const [downloads, setDownloads] = useState(7000000);
  const [activeVersion, setActiveVersion] = useState('1.21.8');
  const [legacyVersions, setLegacyVersions] = useState<string[]>([
    '1.8.8',
    '1.12.2',
    '1.20.6',
  ]);

  const fetchGithubData = async () => {
    let stars = 2000;
    let forks = 1000;
    try {
      const response = await axios.get(
        'https://api.github.com/repos/EssentialsX/Essentials',
      );
      stars = response.data.stargazers_count;
      forks = response.data.forks_count;
    } catch (e) {
      console.error(e);
    }

    setGithubData({ stars, forks });
  };

  const fetchPatreonData = async () => {
    let patrons = 10;
    let sum = 4000;

    try {
      const response = await axios.get(`https://patreon-api.essentialsx.net/`);
      patrons = response.data.data.attributes.patron_count;
      sum = response.data.data.attributes.pledge_sum;
    } catch (e) {
      console.error(e);
    }

    setPatreonData({ patrons, sum });
  };

  const fetchDiscordData = async () => {
    const members = await getDiscordMemberCount();

    setDiscordData({ members });
  };

  const fetchBuildData = async () => {
    // Stable
    try {
      const { data } = await axios.get(
        'https://api.github.com/repos/EssentialsX/Essentials/releases',
      );

      const version = data[0].tag_name;
      const downloads = {
        core: '',
        chat: '',
        spawn: '',
        protect: '',
        discord: '',
        discordlink: '',
        geoip: '',
        antibuild: '',
        xmpp: '',
      };

      data[0].assets.forEach(
        (asset: { name: string; browser_download_url: string }) => {
          const moduleId = getModuleIdFromArtifact(asset.name);
          downloads[moduleId] = asset.browser_download_url;
        },
      );

      setStableBuild({ version, downloads });
    } catch (e) {
      console.error(e);
    }

    // Dev
    const mainCI = 'https://ci.ender.zone/job/EssentialsX/';
    const mainCIAPI = 'https://ci-api.essentialsx.net/job/EssentialsX/';
    const mirrorCI = 'https://ci.lucko.me/job/EssentialsX/';

    try {
      let response;
      let currentCI = mainCI;
      try {
        response = await axios.get(`${mainCIAPI}lastSuccessfulBuild/api/json`);
      } catch {
        response = await axios.get(`${mirrorCI}lastSuccessfulBuild/api/json`);
        currentCI = mirrorCI;
      }

      let commit: string;
      let version: string;
      const downloads = {
        core: '',
        chat: '',
        spawn: '',
        protect: '',
        discord: '',
        discordlink: '',
        geoip: '',
        antibuild: '',
        xmpp: '',
      };

      const build = response.data.id as string;
      version =
        getVersionFromArtifact(response.data.artifacts[0].displayPath) ??
        'Unknown';
      if (response.data.changeSet.items[0]) {
        commit = response.data.changeSet.items[0].commitId;
      } else {
        commit =
          getCommitIdFromArtifact(response.data.artifacts[0].displayPath) ??
          'Unknown';
      }

      response.data.artifacts.forEach(
        (artifact: { displayPath: string; relativePath: string }) => {
          const moduleId = getModuleIdFromArtifact(artifact.displayPath);
          downloads[moduleId] =
            `${currentCI}lastSuccessfulBuild/artifact/${artifact.relativePath}`;
        },
      );

      version = version || 'Unknown';

      setDevBuild({ version, commit, build, downloads });
    } catch (e) {
      console.error(e);
    }
  };

  const fetchDownloads = async () => {
    let response;
    let count = 0;
    try {
      response = await axios.get('https://api.spiget.org/v2/resources/9089');
      count += response.data.downloads;
    } catch (e) {
      console.error(e);
    }

    try {
      response = await axios.get(`https://cf-api.essentialsx.net/`);
      count += response.data.downloads.total;
    } catch (e) {
      console.error(e);
    }

    setDownloads(count);
  };

  const loadVersionData = async () => {
    const { supportedVersions } = await fetchVersionData();

    const versionStrings = supportedVersions.map(v =>
      v.slice(0, v.indexOf('-')),
    );
    setActiveVersion(versionStrings[versionStrings.length - 1]);
    setLegacyVersions(versionStrings.slice(0, -1));
  };

  useEffect(() => {
    void fetchGithubData();
    void fetchPatreonData();
    void fetchDiscordData();
    void fetchBuildData();
    void fetchDownloads();
    void loadVersionData();
  }, []);

  return (
    <SharedDataContext.Provider
      value={{
        github,
        patreon,
        discord,
        devBuild,
        stableBuild,
        downloads,
        activeVersion,
        legacyVersions,
      }}
    >
      {children}
    </SharedDataContext.Provider>
  );
};

export const useSharedData = () => {
  const context = React.useContext(SharedDataContext);
  if (context === undefined) {
    throw new Error('useSharedData must be used within a SharedDataProvider');
  }
  return context;
};
