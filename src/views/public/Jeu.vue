<template>
  <div class="contain">
      <p class="title postitle">S'amuser avec les drapeaux</p>

      <div class="gamecard">
          <div class="state">
          <div class="modale" v-if ="openmodal">
             <div class="bouton modelbouton" @click="modelBoutonsucc" >Retour</div>
             <div v-for="(pays,index) in Echec" :key="index" v-if="count==0" class="modinfo">{{pays.translations.fr}}<img :src="pays.flag" alt=" game image" class = "modflag"></div>
             <div v-for="(pays,index) in Succes" :key="index" v-if="count==1" class="modinfo">{{pays.translations.fr}}<img :src="pays.flag" alt=" game image" class = "modflag"></div>
          </div>
            <div class="stateitem succes left"   @click="modelBoutonsucc" > {{textsucces}}<span  v-if ="succes > 0 ? succes: ''">={{succes}}</span> </div>
            <div class="stateitem echec"   @click="modelBoutonech">{{textechec}}<span  v-if ="echec > 0 ? echec: ''">={{echec}}</span></div>
          </div>
          <div class="gameimage">
              <img :src="pays.flag" alt=" game image">
          </div>
          <div class="gameinput"><input type="text" placeholder="Ta réponse (quel est le nom du pays) ..." class="form-control" v-model="q" ><div class="bouton" @click.prevent="next">Valider</div></div>
          <div class="gameindice"  @click="getindice">
              <p class="indice" v-if="indice ">{{cloindice}}</p>
              <p class="indice" v-else>{{opindice}}</p>
          </div>
          <div class="blocindice" v-if="indice" >
              <div v-for="(pays ,index) in list" :key="index" class="indice" >{{pays.translations.fr}}</div>
          </div>
      </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default{
    name: 'Jeu',
    data(){
      return {
        pays: [],
        random: null,
        nbr: [],
        list: [],
        q: '',
        succes: 0,
        echec: 0,
        textsucces: 'succès',
        textechec: 'échec',
        reponse: '',
        indice: false,
        opindice: "obtenir des indices",
        cloindice: "cacher les indices",
        openmodal: false,
        Succes: [],
        Echec: [],
        count: '',
      }
    },

    mounted(){
      axios
      .get("https://restcountries.com/v2/all")
      .then((res)=>{

            for(let i=0; i<3; i++){
              this.nbr[i] = this.getRandomInt(0, res.data.length)
            }
            for(let i=0; i<3; i++){
              this.list[i] = res.data[this.nbr[i]]
            }
            this.random = this.nbr[this.getRandomInt(0, 3)]

            this.pays = res.data[this.random]
      })
    },

    methods: {
      getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
        },

        next(){
          axios
          .get("https://restcountries.com/v2/all")
          .then((res)=>{

                for(let i=0; i<3; i++){
                  this.nbr[i] = this.getRandomInt(0, res.data.length)
                }
                for(let i=0; i<3; i++){
                  this.list[i] = res.data[this.nbr[i]]
                }
                this.random = this.nbr[this.getRandomInt(0, 3)]
                this.reponse = this.q.toLowerCase() == this.pays.translations.fr.toLowerCase()
                if(this.reponse == true){
                  this.Succes.push(this.pays)
                }
                if(this.reponse == false){
                  this.Echec.push(this.pays)
                }
                this.pays = res.data[this.random]
                if(this.reponse){
                  this.succes = this.succes + 1

                }else{
                  this.echec++
                }

                this.q=''

          })
        },
        getindice(){
          return this.indice = !this.indice
        },
        modelBoutonech(){
          this.count = 0
          return this.openmodal = !this.openmodal
        },
        modelBoutonsucc(){
          this.count = 1
          return this.openmodal = !this.openmodal
        },

    },



  }
</script>
<style scoped>
  .gamecard{
    display: flex;
    flex-direction: column;
    background: #D9D6C3;
    width: 600px;
    margin-left: auto;
    margin-right: auto;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 15px;

  }

  .gameinput{
    width: 500px;
    justify-items: center;
    margin-left: auto;
    margin-right: auto;
    position:  relative;
  }
  .state{
    display:flex;
    justify-content: space-between;
    margin-left: auto;
    margin-right: auto;
    width: 500px;
    margin-bottom: 15px;
    height: 40px;
  }
  .stateitem{
    padding: 0px 96px;
  }

  .succes{
    background: #17E34C;
    color: #fff;
    font-weight: bold;
    text-align: center;
    padding-top: 5px;
    padding-left: 50px;
    border-radius: 5px;
    margin-right: 10px;
    cursor: pointer;
  }
  .echec{
    background: #A82B08;
    color: #fff;
    font-weight: bold;
    text-align: center;
    padding-top: 5px;
    padding-left: 50px;
    border-radius: 5px;
    margin-left: 5px;
    cursor: pointer;
  }
  .gameimage{
    flex-grow: 1;
    margin-left: auto;
    margin-right: auto;
    height: 250px;
    width: 500px;
    margin-bottom: 15px;
    border-radius: 5px;
  }
  .gameindice{
    width: 500px;
    height: 36px;
    background: #3B25FA;
    color: #fff;
    font-weight: bold;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
    border-radius: 5px;
  }
  .indice{
    padding-top: 5px;
  }
  img{
    width: 500px;
    height: 250px;
  }
  .bouton{
      position: absolute;
      top: -0.5px;
      left: 381px;
      padding: 5px 52px 5px 15px;
      height: 38px;
      background: #08A85C;
      border-radius: 0 5px 5px 0;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
  }
  .blocindice{
    display: flex;
    justify-content: flex-start;
    width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
  .indice{
    margin-right: auto;
    margin-left: auto;
    padding: 5px 30px;
    border: 1px solide red;
  }

  /**modale*/
  .modale{
    position:  absolute;
    left: 0;
    top: 0;
    background: rgba(0,0,0,0.7);
    width: 100%;
    border-radius: 5px;
    height: 100%;
    color: #fff;
    font-weight: bold;
    overflow:scroll;
    z-index: 2;
  }
  .modflag{
    height: 50px;
    width: 50px;
    margin-left: 20px;
  }
  body{
    position: relative;
    z-index: 0;
  }

  .modinfo{
    text-align: left;
    margin: 50px 20px 10px 20px;
  }

  .modelbouton{
    margin-top: 10px;
    background: blue;
    border-radius: 4px;
    padding-left: 53px;
  }
  .Cursor{
    cursor: pointer;
  }

  /** responsivite*/
  @media screen and (max-width: 602px){
    .gamecard{
      width: 536px;
    }
  }

  @media screen and (max-width: 550px){
    .gamecard{
      width: 438px;
    }
    img{
      width: 380px;
    }
    .state{
      width: 381px;
    }
    .stateitem{
      padding: 0 57px;
    }
    .gameimage{
      width: 408px;
    }
    .gameinput{
      width: 383px;
    }
    .bouton{
      left: 263px;
    }
    .gameindice{
      width: 384px;
    }
    .stateitem{
      padding-top: 5px;
    }
    .blocindice{
      width: 329px;
    }
    .indice{
      padding: 5px 5px;
    }
  }

  @media screen and (max-width: 455px){
    .gamecard{
      width: 360px;
      padding: 5px;
    }
    img{
      width: 346px;
    }
    .state{
      width: 100%;
    }
    .stateitem{
      padding: 0 46px;
    }
    .gameimage{
      width: 343px;
    }
    .gameinput{
      width: 340px;
    }
    .bouton{
      left: 220px;
    }
    .gameindice{
      width: 338px;
    }
    .stateitem{
      padding-top: 5px;
    }
    .blocindice{
      width: 329px;
    }
    .indice{
      padding: 5px 5px;
    }
  }

  @media screen and (max-width: 388px){
    .gamecard{
      width: 260px;
      padding: 5px;
    }
    img{
      width: 250px;
      height: 200px;
    }
    .state{
      width: 100%;
    }
    .stateitem{
      padding: 0 15px;
    }
    .gameimage{
      width: 250px;
      height: 200px;

    }
    .gameinput{
      width: 250px;
    }
    .bouton{
      left: 183px;
      width: 20px;
      font-size: 15px;
    }
    .gameindice{
      width: 250px;
    }
    .stateitem{
      padding-top: 5px;
    }
    .blocindice{
      width: 250px;
    }
    .indice{
      padding: 5px 5px;
    }
  }
</style>
