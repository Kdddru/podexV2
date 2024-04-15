
const urls = async(id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`

  const response = await fetch(url);
  const json = await response.json();
  
  const name_url = json.species.url
  
  const types_url = json.types.map(( {type} )=> type.url);

  const ability_url = json.abilities.map(({ability} )=> ability.url)
  
  

  return  { url, name_url, types_url, ability_url }

}






export default class Pokemon {

  constructor(id){
    this.id = id
    this.basicInfo = this.getBasicInfo(id);
    this.name = this.getName(id);
    this.type = this.getType(id);
    this.ability = this.getAbility(id);
  }


  async getName(param){
    const {name_url} =  await urls(param);

    const response = await fetch(name_url);
    const json = await response.json();

    const name = json.names.find(( {language} )=> language.name === "ko" ).name
    
    return name
  }

  //기본 데이터
  async getBasicInfo(param){
    const {url} = await urls(param)

    const response = await fetch(url);
    const json = await response.json();

    const { weight, height } = json
    
    
    
    return { weight ,height }
  }

  //타입
  async getType(param){
    const {types_url} = await urls(param)

    const fetch_Data = types_url.map((url)=> fetch(url))

    const type = await Promise.all(fetch_Data)
    .then((response)=> Promise.all(response.map((res)=>res.json())))
    .then((result)=>result.map(( {names} )=>{
      const name = names.find(( {language} )=> language.name === "ko").name

      return name
    }))
    
    return type
  }

  async getAbility(param){
    const {ability_url} = await urls(param)

    const fetch_Data = ability_url.map((u)=>fetch(u));

    const name = await Promise.all(fetch_Data)
    .then((response)=>Promise.all(response.map((res)=>res.json())))
    .then((result)=>result.map(({names, flavor_text_entries})=>{
      const korean_name = names.find(( {language} )=> language.name === "ko").name
      const Korean_flavor_text_entries = flavor_text_entries.find(( {language} )=> language.name === "ko").flavor_text

      return({
        name : korean_name,
        text : Korean_flavor_text_entries
      })
    }))

    return name
  }



}