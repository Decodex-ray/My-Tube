exports.handler=async function(event){
  try{
    const key=process.env.YOUTUBE_API_KEY;
    if(!key)return{statusCode:500,headers:{"content-type":"application/json"},body:JSON.stringify({error:"YOUTUBE_API_KEY is not configured in Netlify."})};
    const channelId=(event.queryStringParameters||{}).channelId||"";
    if(!channelId)return{statusCode:400,headers:{"content-type":"application/json"},body:JSON.stringify({error:"Missing channelId parameter."})};
    const url=new URL("https://www.googleapis.com/youtube/v3/search");
    url.searchParams.set("part","snippet");
    url.searchParams.set("channelId",channelId);
    url.searchParams.set("type","video");
    url.searchParams.set("order","date");
    url.searchParams.set("maxResults","10");
    url.searchParams.set("key",key);
    const r=await fetch(url);
    const data=await r.json();
    return{statusCode:r.status,headers:{"content-type":"application/json"},body:JSON.stringify(data)};
  }catch(e){
    return{statusCode:500,headers:{"content-type":"application/json"},body:JSON.stringify({error:"Server error: "+e.message})};
  }
};
