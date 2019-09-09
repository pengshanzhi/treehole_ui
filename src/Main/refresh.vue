<template>
</template>

<script >
export default {
  name: 'refresh',
  data(){
      return{
          tno:"",
          tpage:"",

      }
  },
  created(){
    
        this.tno = this.$route.params.tno,
        this.tpage = this.$route.params.tpage,
     
       this.$router.push({
                path:'/Detail',
                name:'Detail',
                params:{
                tno:this.tno,
                tpage:this.tpage
                }
              })
  }
  
  }
  
</script>>

<style scoped>

</style>