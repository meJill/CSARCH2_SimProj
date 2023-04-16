$(document).ready(function () {
  class Block {
    constructor(tag, data) {
      this.tag = tag;
      this.data = data;
    }
  }
  
  class CacheSet {
    constructor(numBlocks) {
      this.numBlocks = numBlocks;
      this.blocks = new Array(numBlocks).fill(null);
      this.mruIndex = 0;
    }
  
    getBlock(tag) {
      for (let i = 0; i < this.blocks.length; i++) {
        const block = this.blocks[i];
        if (block !== null && block.tag === tag) {
          this.mruIndex = i;
          return block.data;
        }
      }
      return null;
    }
    
    addBlock(tag, data) {
      for (let i = 0; i < this.blocks.length; i++) {
        if (this.blocks[i] === null) {
          this.blocks[i] = new Block(tag, data);
          this.mruIndex = i;
          return;
        }
      }
      this.blocks[this.mruIndex] = new Block(tag, data);
    }
    printSet(){
        for (let i = 0; i < this.blocks.length; i++) {
            const block = this.blocks[i];
                if(block!=null){
                    console.log("\t"+ block.data)
                }
                else {
                    console.log("\tBLOCK -")
                }
            } 
      }
  } 
  
  class BlockSetAssociativeCache {
    constructor(configuration, cache_size, set_size, block_size) {
        this.configuration = configuration
        this.set_size = set_size
        this.block_size = block_size
        if (this.configuration=="Word"){
            this.numBlocksinCache = cache_size/block_size
            this.numSets = this.numBlocksinCache/set_size
        }  
        if (this.configuration=="Blocks"){
            this.numBlocksinCache = cache_size
            this.numSets = cache_size/set_size
        } 
        this.sets = new Array(this.numSets)
            .fill(null)
            .map(() => new CacheSet(set_size));
        this.hits = 0;
        this.misses = 0;
    }
    
    simulate(instruction){
      for (let index = 0; index < instruction.length; index++) {
        console.log("Fetching " + instruction[index])
        this.read(instruction[index])
        this.print_cache()
      }
    }

    read(value){
      if(this.configuration=="Word"){
        this.read_word(value)
      }
      if(this.configuration=="Blocks"){
        this.read_block(value)
      }
    }

    read_word(address) {
      const tag = Math.floor(
        address / (this.numSets * this.block_size)
      );
      const block = Math.floor(address / this.block_size)
      const set_num = block % this.numSets;
      const blockData = this.sets[set_num].getBlock(tag);
      const min_addr = block * this.block_size
      const max_addr = min_addr+(this.block_size-1)
      if (blockData !== null) {
        this.hits++;
        return blockData;
      }
      this.misses++;
      const newData = `BLOCK ${block} WORD ${min_addr} to ${max_addr}  `;
      this.sets[setIndex].addBlock(tag, newData);
      return newData;
    }

    read_block(block) {
        const tag = Math.floor(
          block / (this.numSets)
        );
        const setIndex = Math.floor(block) % this.numSets;
        const blockData = this.sets[setIndex].getBlock(tag);
        if (blockData !== null) {
          this.hits++;
          return blockData;
        }
        this.misses++;
        const newData = `BLOCK ${block}`;
        this.sets[setIndex].addBlock(tag, newData);
        return newData;
      }
      print_cache(){
        for (let s = 0; s < this.numSets; s++) {
          console.log("Set %d", s)
          this.sets[s].printSet() 
          console.log("\n") 
        }
      }
  }
      
    $(".dropdown-toggle").next(".dropdown-menu").children().on("click", function () {
        $(this).closest(".dropdown-menu").prev(".dropdown-toggle").text($(this).text());
    });
    $("[name='bsa-table']").submit(function (event) {
        var loginForm = document.forms['bsa-table'];
        console.log("Main memory " + loginForm.elements.mm_size.value);
        console.log("Main memory type: " + loginForm.elements.mm_type.innerText);
        console.log("Cache size " + loginForm.elements.cache_size.value);
        console.log("Cache type: " + loginForm.elements.cache_type.innerText);
        console.log("Block size " + loginForm.elements.block_size.value);
        console.log("Set size " + loginForm.elements.set_size.value);
        event.preventDefault();
        new_cache = new BlockSetAssociativeCache(loginForm.elements.mm_type.innerText, parseInt(loginForm.elements.cache_size.value), parseInt(loginForm.elements.set_size.value), parseInt(loginForm.elements.block_size.value))
        new_cache.simulate([1,2,3,4,5,4,6,3])
        document.getElementById("hits").innerHTML = new_cache.hits;

        document.getElementById("misses").innerHTML = new_cache.misses;

        document.getElementById("cm").innerHTML = "Cache Memory";
        var blocksetsize = new_cache.cache_size/new_cache.set_size
        for (var s = 0; s < new_cache.numSets; s++) {
          var element = document.createElement("div");
          element.innerHTML = "Set " + s;
          $("#cm").append(element);
          for (var i = 0; i < 2; i++) {
            var element2 = document.createElement("div");
            element2.innerHTML = "Block " + new_cache.sets[s].blocks[i].data;
            $("#cm").append(element2);
          }
        }

    });
});
