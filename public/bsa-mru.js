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
      }
      
      class BlockSetAssociativeCache {
        constructor(configuration, cache_size, set_size, block_size) {
            this.set_size = set_size
            this.block_size = block_size
            if (configuration="Word"){
                this.numBlocksinCache = cache_size/block_size
                this.numSets = this.numBlocksinCache/set_size
            }  
            if (configuration="Block"){
                this.numBlocksinCache = cache_size
                this.numSets = cache_size/set_size
            } 
            this.sets = new Array(numSets)
                .fill(null)
                .map(() => new CacheSet(set_size));
            this.hits = 0;
            this.misses = 0;
        }
      
        read_word(address) {
          const tag = Math.floor(
            address / (this.numSets * this.block_size)
          );
          const set_num = Math.floor(address / this.block_size) % this.numSets;
          const blockData = this.sets[set_num].getBlock(tag);
          if (blockData !== null) {
            this.hits++;
            return blockData;
          }
          this.misses++;
          const newData = `Data from memory for address ${address}`;
          this.sets[setIndex].addBlock(tag, newData);
          return newData;
        }

        read_block(block) {
            const tag = Math.floor(
              address / (this.numSets)
            );
            const setIndex = Math.floor(address) % this.numSets;
            const blockData = this.sets[setIndex].getBlock(tag);
            if (blockData !== null) {
              this.hits++;
              return blockData;
            }
            this.misses++;
            const newData = `Data from memory for block ${block}`;
            this.sets[setIndex].addBlock(tag, newData);
            return newData;
          }
      }
      
    $(".dropdown-toggle").next(".dropdown-menu").children().on("click", function () {
        $(this).closest(".dropdown-menu").prev(".dropdown-toggle").text($(this).text());
    });
    $("[name='bsa-table']").submit(function (event) {
        var loginForm = document.forms['bsa-table'];
        console.log(loginForm.elements.mm_size.value);
        console.log(loginForm.elements.mm_type.innerText);
        console.log(loginForm.elements.cache_size.value);
        console.log(loginForm.elements.cache_type.innerText);
        console.log(loginForm.elements.block_size.value);
        console.log(loginForm.elements.set_size.value);
        event.preventDefault();
    });
});
