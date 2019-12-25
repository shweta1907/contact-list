const express=require('express');
const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app=express();
const port=3000;

var path=require('path');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static('assets'));
app.use(express.urlencoded());
app.get('/',(req,res)=>{
    Contact.find({},function(err,contacts){
        if(err){console.log('error in fetchig contacts'); return ;};
        return res.render('home',{
            contactNo:contacts,
            title:'Contact List'
    })
    
    });
});
app.post('/create-contact',(req,res)=>{
    // contact_list.push({
    //     name:req.body.name,
    //     phone:req.body.phone
  //});
  //now getting the data and storing in database
  console.log(req.body);
  Contact.create({
      name:req.body.name,
      phone:req.body.phone
  },
  function(err,newContact){
      if(err){
          console.log('error in creating a contact',err);
          return ;
      }
      console.log('********',newContact);
      return res.redirect('back');
  })
    //return res.redirect('/');
});
app.get('/delete-contact',(req,res)=>{
  //get the id from query in the url
  let id=req.query.id;
    //find contact in database and delete it
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting from database');
            return;
        }
        console.log('successfullly deleted');
        return res.redirect('back');
    })
    //let phone=req.query.phone;
    // let index=contact_list.findIndex( contact =>contact.phone==phone);
    // if(index!=-1)
    // contact_list.splice(index,1);
    // return res.redirect('back');
})




app.listen(port,(err)=>{
    if(err){
        console.log('error',err);
        return ;
    }
    console.log('up on localhost:3000');
})