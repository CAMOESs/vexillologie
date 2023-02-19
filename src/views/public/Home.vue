<template>
  <div class="contain">
     <div class="header">
        <p class="title"> Intiez vous a la vexillologie</p>
        <div class="input"><input type="text" placeholder="Recherche (par nom de pays)" class="form-control" v-model="q" v-if=" value =='' " ></div>
        <img src="../../assets/search.png" alt="search" class="search"  v-if=" value =='' ">
        <div class="input"><div type="button" class="change" v-if=" value !=''" @click="change"> Tout les pays </div></div><br>
        <p class="category" :class="  value !='' ? 'pousse' : 'error' ">Recherche par catégorie</p>
        <div class="facCard">
          <div class="fcard fast" :class="  value==continentfr[0] ? 'actived' : 'error' "  @click="getindex(continentfr[0])">
            <p class="facName">{{continentfr[0]}}</p>
          </div>
          <div class="fcard" :class="  value==continentfr[1] ? 'actived' : 'error' " @click="getindex(continentfr[1])">
            <p class="facName Amerique" >Amériques</p>
          </div>
          <div class="fcard" :class="  value==continentfr[2] ? 'actived' : 'error' " @click="getindex(continentfr[2])">
            <p class="facName" >Asie</p>
          </div>
          <div class="fcard" :class="  value==continentfr[3] ? 'actived' : 'error' " @click="getindex(continentfr[3])">
            <p class="facName" >Europe</p>
          </div>
          <div class="fcard faseg" :class="  value==continentfr[4] ? 'actived' : 'error' " @click="getindex(continentfr[4])" >
            <p class="facName " >Océanie</p>
          </div>
        </div>
     </div>
     <div v-if="q && getfilter.length > 0" class="title">{{getfilter.length}}</div>
     <div v-if="q && getfilter.length == 0" class="title">Aucun pays trouvé</div>
     <div class="main">
        <div class="maincard"  v-for="(pays, index) in getfilter" :key="index">
        <router-link :to="pays.name" class="sans">
          <div class="mainimag">
            <img :src= "pays.flag" alt="image" class="imgmain">
          </div>
          <div class="mainnom">
            <b class="nom">Nom : {{ pays.translations.fr }}</b> <br>
            <b class="prenom">Capitale : {{ pays.capital }}</b>
          </div>
          <div class="mainfacname">
            <b class="matiere">Continent : {{ pays.region }}</b>
          </div>
        </router-link>
        </div>

     </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Home',
  data(){
    return{
      pays: null,
      continentfr: ['Afrique', 'Amériques', 'Asie', 'Europe', 'Océanie','Polaire'],
      continenten: ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania','Polar'],
      link: '/about/',
      q: '',
      b: null,
      value: '',
      continent: '',
      filt:{},
    }
  },
  mounted(){
    axios
    .get("https://restcountries.com/v2/all")
    .then((res)=>{
      this.pays = res.data
      for(let i= 0; i < this.pays.length; i++){
      	this.pays[i].region = this.continentfr[this.continenten.indexOf(this.pays[i].region)]

      }

    })
  },
  computed: {
    getfilter(){
      this.b = this.pays ? this.pays : null
      if(this.b!=null && this.value!=''){

          this.continent = this.continentfr[this.continentfr.indexOf(this.value)]
          return this.b.filter(pays => {
            if(pays.region == this.continent){
              return pays.translations.fr
            }

          })

      }else
        if(this.b!=null && this.value =='')
          return this.b.filter(pays => {

            return pays.translations.fr.toLowerCase().includes(this.q.toLowerCase())
          })
    },
    getlink(){
      console.log( "/about/")
      this.b = this.pays ? this.pays : null
      if(this.b!=null){
        console.log( "/about/")
      }
    }
  },

  methods: {
    getindex(index){
      this.value = index
    },
    change(){
      this.value = ''
    },

  }


}
</script>

<style>
  .sans{
    text-decoration: none;
  }
  .header{
    background: rgb(157, 157, 173);
    height: 227px;
  }
  .title{
    font-size: 2rem;
    color: rgb(207, 200, 93);
    font-weight: bold;
  }
  .input{
    width: 700px;
    justify-items: center;
    margin-left: auto;
    margin-right: auto;
    position: absolute;
    left: 160px;
    right: 160px;
  }
  .search{
    position: relative;
    left: 320px;
    height: 35px;
    width: 35px;
    margin-top: 2px;
  }
  .facCard{
    display: flex;
    justify-content: space-between;
    width: 600px;
    justify-items: center;
    margin-right: auto;
    margin-left: auto;
  }
  .category{
    font-size: 1.5rem;
    color: rgb(236, 235, 217);
    font-weight: bold;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .fcard{
    background: rgb(12, 133, 167);
    width: 114px;
    height: 60px;
    box-shadow: 5px 0px 6px rgb(85, 85, 192);
    border-radius: 3px 3px 0px 0px;
    margin-left: 15px;
    cursor: pointer;
  }
  .fcard:hover{
    background: rgb(6, 34, 94);
    transform: scale(1.5);
    transition: all 0.5s;
  }
  .facName{
    font-size: 22px;
    font-weight: bold;
    color: azure;
    text-align: center;
  }

  /** card of teacher */

  .actived{
    background: rgb(207, 200, 93);
  }

  .pousse{
    margin-top: 29px;
  }

  .change{
    background: rgb(12, 133, 167);
    height: 38px;
    margin-bottom: 15px;
    border-radius: 5px;
    color: #fff;
    font-weight: bold;
    padding-top: 5px;
  }

  .main{
    display: flex;
    justify-content: center;
    width: 1030px;
    flex-wrap: wrap;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 40px;

  }

  .maincard{
    border-radius: 5px;
    height: 350px;
    width: 245px;
    background: rgb(196, 196, 233);
    cursor: pointer;
    margin-bottom: 20px;
    margin-left: 10px;
  }

  .maincard:hover{
    box-shadow: 2px 2px 6px;
    transform: scale(1.2);
    transition: all 0.5s;
  }

  .imgmain{
    height: 250px;
    width: 240px;
    background: cover;

    padding: 10px 10px 10px 10px;
  }

  .mainnom, .mainfacname{
    color: #2014c9;
    text-align: left;
    margin-left: 10px;
  }

  .amerique{
    font-size: 20px;
  }

  @media screen and (max-width: 999px) {
    .input{
      width: 500px;
    }
    .search{
    left: 220px;
    height: 35px;

    }
  }
  @media screen and (max-width: 815px) {
    .input{
      width: 400px;
    }
    .search{
    left: 160px;
    height: 35px;

    }
  }
  @media screen and (max-width: 730px) {
    .input{
      width: 350px;
      position: absolute;
      left: 0px;
      right: 0px;

    }
    .search{
    left: 150px;
    height: 35px;

    }
    .title{
      font-size: 20px;
    }
  }

  @media screen and (max-width: 300px) {
    .input{
      width: 100%;
      position: absolute;
      left: 0px;
      right: 0px;

    }
    .search{
    left: 110px;
    height: 35px;

    }
    .title{
      font-size: 20px;
    }
  }

  @media screen and (max-width: 731px) {
    .header{
      height: 210px;
    }
  }

  @media screen and (max-width: 394px) {
    .header{
      height: 210px;
    }
  }

  @media screen and (max-width: 670px) {
    .facCard{
      width: 494px;
    }
  }

  @media screen and (max-width: 560px) {
    .facCard{
      width: 68px;
      margin-left: 50px;
      margin-right: 40px;
    }
    .fcard{
      width: 168px;
      height: 60px;
      padding-left: 21px;
      padding-right: 21px;
    }
    .facName{
      font-size: 10px;
      margin-top: 15px;
    }


  }

  @media screen and (max-width: 520px) {
    .facCard{
      width: 68px;
      margin-left: 20px;
      margin-right: 0px;
    }
    .fcard{
      width: 168px;
      height: 60px;
      padding-left: 21px;
      padding-right: 21px;
    }
    .facName{
      font-size: 10px;
      margin-top: 15px;
    }


  }
  @media screen and (max-width: 485px) {
    .facCard{
      width: 68px;
      margin-left: 0px;
      margin-right: 0px;
    }
    .fcard{
      width: 168px;
      height: 60px;
      padding-left: 21px;
      padding-right: 21px;
    }
    .facName{
      font-size: 10px;
      margin-top: 15px;
    }


  }
  @media screen and (max-width: 460px) {
    .facCard{
      width: 48px;
      margin-left: 0px;
      margin-right: 0px;
    }
    .fcard{
      width: 68px;
      height: 60px;
      padding-left: 21px;
      padding-right: 21px;
    }
    .facName{
      font-size: 10px;
      margin-top: 15px;
    }


  }
  @media screen and (max-width: 430px) {
    .facCard{
      width: 48px;
      margin-left: 0px;
      margin-right: 0px;
    }
    .fcard{
      width: 68px;
      height: 60px;
      padding-left: 16px;
      padding-right: 10px;
    }
    .facName{
      font-size: 10px;
      margin-top: 15px;
    }


  }
  @media screen and (max-width: 380px) {
    .facCard{
      width: 48px;
      margin-left: 0px;
      margin-right: 0px;
    }
    .fcard{
      width: 68px;
      height: 60px;
      padding-left: 13px;
      padding-right: 10px;
    }
    .facName{
      font-size: 10px;
      margin-top: 15px;
    }


  }
  @media screen and (max-width: 362px) {
    .facCard{
      width: 100%;
      margin-left: 0px;
      margin-right: 0px;
    }
    .fcard{
      width: 68px;
      height: 60px;
      padding-left: 0px;
      padding-right: 0px;
    }
    .facName{
      font-size: 10px;
      margin-top: 15px;
    }
    .fast{
      margin-left: 3px;
    }
    .faseg{
      margin-right: 3px;
    }

  }
  @media screen and (max-width: 280px) {
    .header{
      height: 192px;
    }
    .category{
      font-size: 15px;
    }
    .facCard{
      width: 48px;
      margin-left: 0px;
      margin-right: 0px;
    }
    .fcard{
      width: 68px;
      height: 25px;
      padding-left: 2px;
      padding-right: 0px;
    }
    .facName{
      font-size: 10px;
      margin-top: 5px;
      margin-bottom: 0;
    }


  }
/** card of teacher */
  @media screen and (max-width: 999px) {
    .main{
      margin-left: auto;
      margin-right: auto;
      width: 900px;
      justify-content: center;
    }

  }

  @media screen and (max-width: 900px) {
    .main{
      margin-left: auto;
      margin-right: auto;
      width: 800px;
    }

  }

  @media screen and (max-width: 815px) {
    .main{
      margin-left: auto;
      margin-right: auto;
      width: 700px;
    }

  }

  @media screen and (max-width: 700px) {
    .main{
      margin-left: auto;
      margin-right: auto;
      width: 600px;
    }

  }

  @media screen and (max-width: 600px) {
    .main{
      margin-left: auto;
      margin-right: auto;
      width: 550px;
    }

  }

  @media screen and (max-width: 560px) {
    .main{
      margin-left: auto;
      margin-right: auto;
      width: 300px;
    }

  }

  @media screen and (max-width: 290px) {
    .main{
      margin-left: auto;
      margin-right: auto;
      width: 150px;
    }

  }

</style>
