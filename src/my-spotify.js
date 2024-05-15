import { LitElement, html, css } from "lit";

class mySpotify extends LitElement{
  static properties= {
    track: {type: String}
  }
  static styles = css`
    .play_bar{
      width: 100%;
      height: 80vh;
    }

    #search{
      background-color: blue;
      width: 100px
      height:10px
    }
  `;
  render(){
    return html`
        <input id="search" @change="${this.getTrack}"></input>
        <iframe 
        src="https://open.spotify.com/embed/track/${this.track}" 
        frameBorder="0" 
        allow="autoplay; height="1000" clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" class="play_bar"></iframe>
      ` 
  }

  async getTrack(e){
    const config = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '3f4c660f71msh5286a7e33f1ba8fp1428c3jsnc1252ecd5a6d',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    };
    let res = await fetch(`https://spotify23.p.rapidapi.com/search/?q=${e.target.value}&type=tracks&offset=0&limit=1`, config)
    let data = await res.json();
    let {tracks: {items: [musica]}} = data;
    this.track = musica.data.id;
    this.requestUpdate();
  }
}

customElements.define("my-spotify", mySpotify)