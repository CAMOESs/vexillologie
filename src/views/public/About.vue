<template>
    <div class="contain">
       <div class="title">Description</div>
       <div class="descont">
         <div class="desflag">
            <div class="flag">
              <img :src = "pays.flag" alt=" flag" class="miniflag">
            </div>
            <div class="des">
              <b class="paysdes">Nom : {{ nom }} </b> <br>
              <b class="paysdes">Capitale : {{ pays.capital }}</b><br>
              <b class="paysdes">Continent : {{ pays.region }}</b><br>
              <b class="paysdes">Population : {{ pays.population }}</b><br>
              <a class="paysdes btn btn-info" href="/">Retour</a>
            </div>
         </div>
       </div>
    </div>
  </template>

  <script>
  import axios from 'axios'
  export default {
      name: 'About',
      data(){
        return{
          name: this.$route.params.name,
          pays: [],
          nom: "",
          continentfr: ['Afrique', 'Amériques', 'Asie', 'Europe', 'Océanie','Polaire'],
          continenten: ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania','Polar'],
        }
      },
      mounted(){
        axios
        .get("https://restcountries.com/v2/name/"+this.name)
        .then((res)=>{
          this.pays = res.data[0]
          this.nom = this.pays.translations.fr
          	this.pays.region = this.continentfr[this.continenten.indexOf(this.pays.region)]

        })
      }

  }
  </script>

  <style>
    .desflag{
      display: flex;
      justify-content: flex-start;
      margin-left: 10px;
    }

    .miniflag{
      height: 300px;
      width: 500px;
      background: cover;

      padding: 10px 10px 10px 10px;
    }

    .descont{
      background: rgb(196, 196, 233);
      margin-left: 10px;
      margin-right: 10px;
      border-radius: 5px;
      color: rgb(19, 19, 233);;
    }

    .des{
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 30px;
      text-align: left;
      width: 100%;
    }

    .paysdes{
      display: inline-block;
      margin-bottom: 15px;
    }

    @media screen and (max-width: 732px){
      .descont{
        width: 300px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 15px;
      }
      .desflag{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 300px;
        margin-left: auto;
        margin-right: auto;
      }
      .miniflag{
        width: 300px;
        height: 200px
      }
      .des{
        padding-top: 10px;
      }
      .paysdes{
        margin-bottom: 5px;
      }
    }

    @media screen and (max-width: 312px){
      .descont{
        width: 200px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 15px;
      }
      .desflag{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 200px;
        margin-left: auto;
        margin-right: auto;
      }
      .miniflag{
        width: 200px;
        height: 100px
      }
      .des{
        padding-top: 10px;
      }
      .paysdes{
        margin-bottom: 5px;
      }
    }
  </style>
