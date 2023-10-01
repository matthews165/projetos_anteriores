<?php 

  class User {
    public $email;
    protected $name;
    public $role = 'member';

    public function __construct($name, $email){
      $this->email = $email;
      $this->name = $name;
    }

    public function __destruct(){
      echo "the user $this->email was removed <br>" ;
    }

    public function __clone(){
      $this->email = $this->email . '(clone)<br>';
    }

    public function message(){
      return "$this->name sent a new message";
      }

    public function login(){

      echo $this->name . 'logged in';
    }

    public function getName(){
      return $this->name;
    }

    public function setName($name){
      if(is_string($name) && strlen($name) > 1){
        $this->name = $name;
        return "name has been updated to $name";
      } else {
        return 'not a valid name';
      }
    }
  }

  class adminUser extends User {

    public $level;
    public $role = 'admin';

    public function __construct($name,$email,$level){
      $this->level = $level;
      parent::__construct($name,$email);
    }

    public function message(){
      return "$this->name ADM baniu vc";
      }

  }


  $userTwo = new User('joao','joao@abc');
  $userThree = new adminUser('doria','doria@abc', 5);

  echo $userTwo->role . '<br>';
  echo $userThree->role . '<br>';

  echo $userThree->message() . '<br>';
  echo $userTwo->message() . '<br>';

  echo $userThree->email . '<br>';
  echo $userThree->getname() . '<br>';
  echo $userThree->level . '<br>';

  unset($email);
  $userFour = clone $userThree;
  echo $userFour->email;

 




?>


<!DOCTYPE html>
<html >
<head>
    <title>Document</title>
</head>
<body>
    
</body>
</html>