<?php 
if (!empty($_POST['name']) AND !empty($_POST['email'])){

  $letter ='Name: '.$_POST['name'].'\r\n';
  $letter .='Email: '.$_POST['email'].'\r\n';
  $letter .='Comments: '.$_POST['comments'];

  $url = 'https://api.mailgun.net/v3/sandbox938ee49312c8424aa3a0d5e063243234.mailgun.org/messages?';
  $params = array('from'    => 'Mailgun Sandbox <postmaster@sandbox938ee49312c8424aa3a0d5e063243234.mailgun.org>',
    'to'      => 'Galina <galina.brenvald@gmail.com>',
    'subject' => 'Message from Visitka',
    'text'    => $letter);

  $result = file_get_contents($url, false, stream_context_create(array(
  'http' => array(
  'method'  => 'POST',
  'header'  => "Authorization: Basic ".base64_encode("api:key-cdca4611dbb2bb5b5091445a48f2971c"),
  'content' => http_build_query($params)
  )
)));

if (strpos($result, 'Queued. Thank you.') !== false) {
   $data = array('success');
   header('Content-type: application/json');
   echo json_encode($data);
   exit;
} else {
  $data = array('error while sending');
  header('Content-type: application/json');
  echo json_encode($data);
  exit;
}
} else {
    $data = array('incorrect fields');
    header('Content-type: application/json');
    echo json_encode($data);
    exit;
}