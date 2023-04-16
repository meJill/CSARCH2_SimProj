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
        if (this.configuration=="Words"){
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
      console.log(this);
      for (let index = 0; index < instruction.length; index++) {
        console.log("Fetching " + instruction[index])
        this.read_block(instruction[index])
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
        console.log("hi" + this.numSets)
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

  new_cache = new BlockSetAssociativeCache("Words", 4096, 4, 64)
  array = []
  for (i = 0; i < 100; i++)
  {
    array.push(i)
  }
  console.log(array)
  new_cache.simulate(array)