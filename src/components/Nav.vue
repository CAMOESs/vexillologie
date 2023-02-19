<template>
    <div class="_nav">
        <div class="_logo">
              <img alt = "logo" src="../assets/logo2.jpeg" class="img">
              <span class="textlogo">Les pays du monde</span>
        </div>
        <nav>

            <div class="navItem">

                <router-link to="/">Accueil</router-link>
                <router-link to="/jeu">Jouer</router-link>
            </div>
        </nav>

    </div>
</template>

<script>
export default {
    name: 'Nav'

}
</script>

<style scoped>
    ._nav{
        display: flex;
        background: rgb(22, 22, 87);
        /*color: #fff;*/
        justify-content: space-between;
        text-align: center;

    }

    .img{
        border-radius: 50%;
        height: 60px;
        width: 60px;
    }

    .textlogo{
        color: #fff;
        font-size: 25px;
        padding-left: 5px;
        font-weight: bold;
    }

    .nav{
        display: flex;
    }

    a:hover{
        border-radius: 5px;
        background: #42b983;
        transition: color 0.5s;
        color: #fff;
    }

    a{
        padding: 10px 20px;
    }

    ._logo, .navItem{
        padding: 10px;
    }

    .navItem{
        text-align: center;
        margin-top: 10px;
    }
    .sans{
      text-decoration: none;
    }

    @media screen and (max-width: 730px) {
        .textlogo{
            font-size: 15px;
        }
        .img{
            height: 30px;
            width: 30px;

        }
        ._nav{
            display: block;
            padding: 0px;
            width: 100%;
        }
        .navItem{
            padding: 0px;
            margin-top: 5px;
            text-align: center;
        }
        .nav{
            display: inline-block;
            padding: 0;
        }
        nav a{
            padding: 2px 5px;
        }
        ._logo{
            padding: 5px 5px 0px 5px;
        }
        nav{
            padding-top: 0;
        }
        .navItem a{
            margin-left: 5px;
        }
    }
</style>
