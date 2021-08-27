<?php 
    $from = 'info@beyondskool.com';    
    $to_email = 'admin@beyondskool.in';
    $cc_email = 'nainika.nihalaney@beyondskool.in';    
    $messageHtml = $_REQUEST['message'];
    $subject = $_REQUEST['subject'];
    //$subject = 'Testing PHP Mail';

    // To send HTML mail, the Content-type header must be set
    $headers .= 'MIME-Version: 1.0' . "\r\n";
    //$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
    $headers .= 'Cc: '.$cc_email."\r\n";
    $headers .= 'From: '.$from."\r\n".
    'Reply-To: '.$from."\r\n" .
    'X-Mailer: PHP/' . phpversion();   

    // Save the User's answer JSON
    $file = $_REQUEST['answerJsonFile'];
    $studentAnswerJSON =  $_REQUEST['answerJson'];
    $bytes = file_put_contents($file, $studentAnswerJSON); 
    echo "The number of bytes written are $bytes.";
    
    // Attachment file
    // Boundary  
    $semi_rand = md5(time());  
    $mime_boundary = "==Multipart_Boundary_x{$semi_rand}x";  
 
    // Headers for attachment  
    $headers .= "\nMIME-Version: 1.0\n" . "Content-Type: multipart/mixed;\n" . " boundary=\"{$mime_boundary}\"";     
    
    // Multipart boundary  
    $message = "--{$mime_boundary}\n" . "Content-Type: text/html; charset=\"UTF-8\"\n" . 
    "Content-Transfer-Encoding: 7bit\n\n" . $messageHtml . "\n\n";  

    // Preparing attachment 
    if(!empty($file) > 0){ 
        if(is_file($file)){ 
            $message .= "--{$mime_boundary}\n"; 
            $fp =    @fopen($file,"rb"); 
            $data =  @fread($fp,filesize($file)); 
    
            @fclose($fp); 
            $data = chunk_split(base64_encode($data)); 
            $message .= "Content-Type: application/octet-stream; name=\"".basename($file)."\"\n" .  
            "Content-Description: ".basename($file)."\n" . 
            "Content-Disposition: attachment;\n" . " filename=\"".basename($file)."\"; size=".filesize($file).";\n" .  
            "Content-Transfer-Encoding: base64\n\n" . $data . "\n\n"; 
        } 
    } 
    $message .= "--{$mime_boundary}--"; 
    // $returnpath = "-f" . $from; 

    mail($to_email,$subject,wordwrap($message),$headers);  

    unlink($file);
?>
