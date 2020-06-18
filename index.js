
class ProfileList {
  constructor(profiles) {
      this.profiles = profiles
      this.profileIterator = ProfileIterator(profiles)
      this.addListeners()
      this.onMount()
    
  }

  onMount() {
    this.render()
  }
  
  get profileElement() {
    return  document.querySelector('.profile')
  }

  get button() {
    return document.querySelector('#button')
  }

  addListeners() {
    this.button.addEventListener('click',(e)=>{
      e.preventDefault()
      this.render()
    })
  }

  getHtmlProfile (profile) {
    const {name,age,picture} = profile
    return `<img src="${picture}" alt="pic"/>
            <h3 class="profile-name">${name}</h3>
            <p>${age}</p>
            `
}



  render() {
    const currentProfile = this.profileIterator.next().value
    if(currentProfile) {
      const profileHTML = this.getHtmlProfile(currentProfile)
      this.profileElement.innerHTML = profileHTML
    }
    else {
      window.location.reload()
    }
    
  }


}



  function ProfileIterator(profiles) {
    let nextIndex = 0;
    return {
      next:function() {
        return nextIndex < profiles.length
        ?{value:profiles[nextIndex++],done:false}
        : {done:true}
      }
    }

  }

 async function BuildProfileList(url) {
    const data = await fetch(url);
    const profiles =   await data.json();
    return new ProfileList(profiles)
  }
  

const profiles = BuildProfileList('./profiles.json')