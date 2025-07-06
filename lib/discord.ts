import axios from 'axios';

export async function getDiscordMemberCount() {
  let members = 1000;
  try {
    const response = await axios.get(
      'https://canary.discordapp.com/api/guilds/390942438061113344/widget.json',
    );
    members = response.data.presence_count;
  } catch (e) {
    console.error(e);
  }

  return members;
}
