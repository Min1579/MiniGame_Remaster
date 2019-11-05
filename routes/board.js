const express = require('express');
const router = express.Router();
// board
router.get('/rank', (req,res)=> {
    const ulist= [];
    function users(name,score) {
        this.name = name;
        this.score = score;
    }
    for(let i=0; i<100; i++){
        ulist.push(new users('aaaa', i+111))
    }
    console.dir(users);
   res.render('rankBoard',{ulist : ulist});
});



// community

router.get('/community', (req,res)=> {
    function Board(no, title, author, date, readcnt){
        this.no = no;
        this.title = title;
        this.author = author;
        this.date = date;
        this.readcnt = readcnt;
    }

    let output = '';
    for(let i=0; i<100; i++) {
        output += `
            tr
                td= ${i}+1
                td
                    a(href="#") aaaa
                td bbbb
                td ${new Date()}
                td 0
        `
    }

    res.render('communityBoard',{output:output});
});


module.exports = router;
