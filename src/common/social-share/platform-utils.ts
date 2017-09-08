export interface Properties{
  url?:string;
  title?:string;
  description?:string;
  image?:string;
  via?:string;
  hashtags?:string;
}
export interface Platform{
  name:string;
  url:string;
  properties?:any;
}
export interface Platforms { // plural
  twitter:Platform;
  facebook:Platform;
  googlePlus:Platform;
  pinterest:Platform;
  reddit:Platform;
  linkedin:Platform;
  stumbleUpon:Platform;
  tumblr:Platform;
  mail:Platform;
}

export const platforms:Platforms = {
  twitter : {
    name: 'twitter',
    url: 'https://twitter.com/intent/tweet?url=',
    properties:{
      text:'title',
      via:'via',
      hashtags:'hashtags'
    }
  },
  googlePlus : {
    name: 'google-plus',
    url: 'https://plus.google.com/share?url='
  },
  facebook : {
    name:'facebook',
    url: 'http://www.facebook.com/sharer/sharer.php?u='
  },
  reddit : {
    name: 'reddit',
    url: 'http://www.reddit.com/submit?url=',
    properties:{
      title:'title'
    }
  },
  pinterest:{
    name:'pinterest',
    url: 'https://pinterest.com/pin/create/button/?url=',
    properties:{
      description:'title',
      media:'image'
    }
  },
  linkedin : {
    name:'linkedin',
    url: 'http://www.linkedin.com/shareArticle?mini=true&url=',
    properties:{
      title:'title'
    }
  },
  stumbleUpon : {
    name:'stumbleUpon',
    url: 'http://www.stumbleupon.com/submit?url=',
    properties:{
      title:'title'
    }
  },
  tumblr : {
    name:'tumblr',
    url: 'http://www.tumblr.com/share/link?url=',
    properties:{
      title:'title',
      caption:'description'
    }
  },
  mail : {
    name:'mail',
    url: 'mailto:?subject='
  }
}