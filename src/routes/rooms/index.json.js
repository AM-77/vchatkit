import { envs } from '../../utils/envs'

export const post = async () => {
  
  const exp = Math.round(Date.now() / 1000) + 60 * 120;
  const options = { properties: { exp } };

  try {
    const res = await fetch('https://api.daily.co/v1/rooms', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${envs.DAILY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options)
    });
    if (res.ok) {
      const room = await res.json();
      return {
        status: 200,
        body: JSON.stringify({ success: true, room })
      };
    } else {
      return {
        status: res.status,
        body: JSON.stringify({ success: false, merssage: res.statusText })
      };
    }
  } catch (error) {
    return {
      status: 500,
      body: JSON.stringify({ success: false, message: 'Something went wrong with the room creation!' })
    };
  }
}
