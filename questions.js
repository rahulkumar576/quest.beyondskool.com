(function () {

  var questions = null;
  var introText = '<p class="font-white orange-bg main-head text-center">BeyondSkool <span class="text-bold">‘IQ+CQ+EQ’</span> Success-Quotient Test</p> '  + '<div class="container hide-on-desktop"><div class="row"><p span class="form-intro text-center">Please fill out the form below before starting the assessment.</p></div></div>' + '<div class="container hide-on-desktop"><div class="row"><div class="form-sec text-center"><form action="email_form.php?do=send" method="POST"><input type="text" id="fname" name="fname" placeholder="Child\'s Name"><br><span id="fnameError" class="required">*The Name field is required.</span><br><input type="email" id="mail" name="Email" placeholder="Your Email"><br><span id="EmailError" class="required">*The Email field is required.</span><br><input type="text" id="pname" name="pname" placeholder="Parent\'s Name"><br><span id="pnameError" class="required">*The Parent\'s name field is required.</span><br><select name="age" id="age" placeholder="Age"><option value="">--Select Child\'s Age--</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option></select><br><span id="ageError" class="required">*The Age field is required.</span><br><input type="number" id="phone" name="phone" placeholder="Contact Number"><br><span id="phoneError" class="required">*The Phone number field is required.</span></form></div></div></div>' + '<div class="container hide-on-desktop"><div class="button next-form-button" id="landingMobileNext"><a href="#">Next</a></div></div>' + '<div class="container"><div class="row"><p class="text-center">The world is evolving and so are the needs of this New-World. While IQ was enough a few years ago, it is not enough to be the best in this new and fast-moving world. Hence, BeyondSkool focuses on transforming a generation of passive learners to become Sharp Thinkers, Innovators and Influencers. The 3Q Assessment is a tangible output to measure your child’s growth across the success quotients.</p></div></div>' + '<div class="container"><div class="row"><div class="sec-head"><h3 class="sec-main-title text-center font-blue">What is IQ, CQ and EQ?</h3><p class="sec-sub-title text-center">The new world Success Quotients</p></div></div></div>' + '<div class="container"><div class="row"><div class="test-info"><div class="one-third test-info-block text-center"><img src="images/icon-01.png"><p class="text-center"><span class="text-bold font-blue">IQ: </span> An ability to demonstrate critical thinking and logical thought. <br><span class="font-orange">A Problem Solver</span></p></div><div class="one-third test-info-block text-center"><img src="images/icon-02.png"><p class="text-center"><span class="text-bold font-blue text-center">CQ: </span> An ability to demonstrate problem solving and creativity. <br><span class="font-orange"> An Innovator</span></p></div><div class="one-third test-info-block text-center"><img src="images/icon-03.png"><p class="text-center"><span class="text-bold font-blue">EQ: </span> An ability to effectively communicate, make decisions and collaborate.<br><span class="font-orange">An Influencer</span></p></div></div></div></div>' + '<div class="container"><div class="row"><div class="test-creator-block"><div class="one-third text-center creator-block"><div class="creator-inner"><h3 class="text-center font-white blue-bg">How does this help the child?</h3><p class="text-center">The assessment is divided in 3 parts: Baseline, Mid-line, and Final. We have made sure that we are assessing a child’s progress at different levels in their journey.</p></div></div><div class="one-third text-center creator-block"><div class="creator-inner"><h3 class="text-center font-white orange-bg">Who created the test?</h3><p class="text-center">Our esteemed academic team including alumnus of Teach for India and experienced educationists from schools across India.</p></div></div><div class="one-third text-center creator-block"><div class="creator-inner"><h3 class="text-center font-white blue-bg">Is it a cumulative score?</h3><p class="text-center">All three quotients are separate, equally important and mutually exclusive. Hence, the scores will be separate for each of them.</p></div></div></div></div></div>' + '<div class="container hide-on-mobile"><div class="row"><p span class="form-intro text-center">Please fill out the form below before starting the assessment.</p></div></div>' + '<div class="container hide-on-mobile"><div class="row"><div class="form-sec text-center"><form action="email_form.php?do=send" method="POST"><input type="text" id="fname" name="fname" placeholder="Child\'s Name"><br><span id="fnameError" class="required">*The Name field is required.</span><br><input type="email" id="mail" name="Email" placeholder="Your Email"><br><span id="EmailError" class="required">*The Email field is required.</span><br><input type="text" id="pname" name="pname" placeholder="Parent\'s Name"><br><span id="pnameError" class="required">*The Parent\'s name field is required.</span><br><select name="age" id="age" placeholder="Age"><option value="">--Select Child\'s Age--</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option></select><br><span id="ageError" class="required">*The Age field is required.</span><br><input type="number" id="phone" name="phone" placeholder="Contact Number"><br><span id="phoneError" class="required">*The Phone number field is required.</span></form></div></div></div><div class="button home-button" id="landingNext"><a href="#">Next</a></div>';

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  var isIntro = true;
  var studentAgeGroup = "" //Child Age Group
  var studentAnswerJsonFile = "" //Child Answer JSON File Name
  var questionTypes = {
    objective: "objective",
    subjective: "subjective"
  }

  // Display initial question
  displayNext();

  // Click handler for the 'Landing next' button
  // $('#landingNext').on('click', function (e) {
  $(document).on('click', '#landingNext', function () { 
    //e.preventDefault();    
    nextButtonHandler();    
  });
  
   // Click handler for the 'Landing next' button
  //$('#landingMobileNext').on('click', function (e) {
  $(document).on('click', '#landingMobileNext', function () {       
    nextButtonHandler();    
  });
  
  function nextButtonHandler(){
      // Suspend click listener during fade animation
    if (quiz.is(':animated')) {
      return false;
    }

    //Store Child Information into hidden fields before moving to next slide
    var parentName = $('form:visible').find('#pname').val();
    var contactNumber = $('form:visible').find('#phone').val();
    var email = $('form:visible').find('#mail').val();
    var studentName =$('form:visible').find('#fname').val();
    var studentAge = $('form:visible').find('#age').val();///////////////////////////////////////////////////

    //Check for Child Information before moving to next slide
    if (formValidations()) {

      //Store Child Information in Hidden Fields
      $('#hdParentName').val(parentName);
      $('#hdContactNumber').val(contactNumber);
      $('#hdEmail').val(email);
      $('#hdStudentName').val(studentName);
      $('#hdStudentAge ').val(studentAge);

      //Form name for student result json file. Format is <%Student Name%> + <%current date%>
      var today = new Date().toISOString();
      today = today.substring(0, today.indexOf("T"));
      studentAnswerJsonFile = studentName.replace(/\s/g, '') + "Answers" + today + ".json";

      //Get the question set from question json file
      if (questions === null) {

        var questionJsonFile = "";
        if (studentAge === "6" || studentAge === "7") {
          questionJsonFile = "student7years.json";
          studentAgeGroup = "6-7";
        }
        else if (studentAge === "8" || studentAge === "9") {
          questionJsonFile = "student9years.json";
          studentAgeGroup = "8-9";
        }
        else if (studentAge === "10" || studentAge === "11") {
          questionJsonFile = "student11years.json";
          studentAgeGroup = "10-11";
        }

        if (questionJsonFile) {
          isIntro = false;
          readJSONFile(questionJsonFile, function (text) {
            var jsonData = JSON.parse(text);
            if (jsonData !== null) {
              questions = jsonData.questions;
              displayNext();
            }
          });
        }
      }
    }
  }

  // Click handler for the 'Question next' button
  $(document).on('click','#next',function () {
    // Suspend click listener during fade animation
    if (quiz.is(':animated')) {
      return false;
    }

    choose();

    // If no user selection, progress is stopped      
    if (!!(selections[questionCounter])) {
      questionCounter++;
      displayNext();
    } else {
      if (questions[questionCounter].questionType === questionTypes.subjective) {
        alert('Please enter the text');
      }
      else if (questions[questionCounter].questionType === questionTypes.objective) {
        alert('Please make a selection!');
      }
    }
  });

  // Click handler for the 'prev' button
  $(document).on('click', '#prev', function () {

    if (quiz.is(':animated')) {
      return false;
    }

    choose();
    if (questionCounter === 0) {
      isIntro = true;

      //Clear the question set and previous selection array
      questions = null;
      selections = [];
      applyBackground(false);
    }
    else {
      isIntro = false;
      questionCounter--;
    }

    displayNext();
  });

  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();

    if (quiz.is(':animated')){
      return false;
    }
    questions = null;
    questionCounter = 0;
    selections = [];
    isIntro = true;
    displayNext();
    $('#start').hide();
  });

  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });

  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  // Validate Form Fields
  function formValidations() {
    isValid = true;
    //Get all input and select fields of form element
    var selectQuery = "form:visible input, " + " form:visible select";
    var formFields = $(selectQuery).serializeArray();

    //Check every field for empty value. If field value is empty then show error statement else hide error statment
    $.each(formFields, function (i, field) {
      
      //Ser the Error Field name
      var errorField = field.name + "Error";

      //Check the input field value
      field.value = $.trim(field.value);
      
      if (!field.value) {
        isValid = false;
        $('form:visible').find('#' + errorField).show(); 
      }
      else {
        $('form:visible').find('#' + errorField).hide();
      }
    });

    return isValid;
  }
  // Clear Form Fields
  function clearFormFields() {
   $('form:visible').find('#pname').val("");
    $('form:visible').find('#phone').val("");
    $('form:visible').find('#mail').val("");
    $('form:visible').find('#fname').val("");
    $('form:visible').find('#age').val("");
  }

  // Creates and returns the div that contains the questions and the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var qMainElement = $('<div>', {
      id: 'questionMain'
    });
    
    var qHeadElement = $('<div>', {
        id: 'questionHead'
    });
    
    var tagline = $('<p class="font-blue main-tagline"><span class="text-bold">BeyondSkool</span> \'IQ+CQ+EQ\' Success-Quotient Test</p>');
    qHeadElement.append(tagline);

    var section = $('<div class="section-name"><h3 class="font-white orange-bg">' + questions[index].section + '</h3></div>');
    qHeadElement.append(section);

    qMainElement.append(qHeadElement);
    
    var qImgElementd = $('<div>', {
        id: 'quesImaged',
        class: 'one-half'
    });
    var quesImgd = $('<div class="ques-img"><img src="' + questions[index].qimage + '"></div>');
    qImgElementd.append(quesImgd);
    
    qMainElement.append(qImgElementd);
    
    var qTextElement = $('<div>', {
      id: 'questionText',
      class: 'one-half'
    });
    

    var header = $('<h3 class="ques-num font-blue">Question ' + (index + 1) + ':</h3>');
    qTextElement.append(header);

    var question = $('<p class="question-main">').append(questions[index].question);
    qTextElement.append(question);

    if (questions[index].questionType == "objective") {
      var radioButtons = createRadios(index);
      qTextElement.append(radioButtons);
    }
    else if (questions[index].questionType == "subjective") {
      var textArea = $('<textarea id="answer" name="answer" rows="8" cols="50"></textarea>');
      qTextElement.append(textArea);
    }

    qMainElement.append(qTextElement);

    var qImgElement = $('<div>', {
        id: 'quesImage',
        class: 'one-half'
    });
    var quesImg = $('<div class="ques-img"><img src="' + questions[index].qimage + '"></div>');
    qImgElement.append(quesImg);
    
    qMainElement.append(qImgElement);

    var qButtonElement = $('<div>', {
      id: 'questionButton'
    });

    var nextButton = $("<div class='button' id='next'><a href='#'>Next</a></div><div class='button' id='prev'><a href='#'>Prev</a></div>");
    qButtonElement.append(nextButton);

    qMainElement.append(qButtonElement);
    qElement.append(qMainElement);
    
    var qImageElement = $('<div>', {
      id: 'questionImage'
    });

    var questionImage = $('<img src="' + questions[index].image + '">');
    qImageElement.append(questionImage);

    qElement.append(qImageElement);

    return qElement;
  }
  function applyBackground(isQuestion){
      if(isQuestion){
          if (questions[questionCounter].subject === "stem") {
             $('.quiz-area-inner').addClass('stem-bg');
          }
          else if ((questions[questionCounter].subject === "LogiMath") || (questions[questionCounter].subject === "Applied Math"))  {
             $('.quiz-area-inner').removeClass('stem-bg');
             $('.quiz-area-inner').addClass('math-bg');
          }
          else if (questions[questionCounter].subject === "Leadership Communication") {
             $('.quiz-area-inner').removeClass('stem-bg');
             $('.quiz-area-inner').removeClass('math-bg');
             $('.quiz-area-inner').addClass('lc-bg');
          }
      }
      else{
          $('.quiz-area-inner').addClass('no-bg');
      }
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value="' + questions[index].choices[i] + '" />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    if (questions[questionCounter].questionType === questionTypes.subjective) {
      selections[questionCounter] = $('textarea[name="answer"]').val();
    }
    else if (questions[questionCounter].questionType === questionTypes.objective) {
      selections[questionCounter] = $('input[name="answer"]:checked').val();
    }
  }

  // Displays next requested element
  function displayNext() {

    quiz.fadeOut(function () {
      $('#question').remove();

      if (isIntro) {
        //$('#landingNext').show();
        //$('#landingNext').addClass("home-button");
        var introElement = $('<div>', {
          id: 'question',
        });
        introElement.append(introText);
        quiz.append(introElement).fadeIn();
        // $('#quizIntro').show();
      }
      else {
        //$('#landingNext').hide();
        if (questionCounter < questions.length) {
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          applyBackground(true);
          if ((selections[questionCounter])) {
            $('input[value="' + selections[questionCounter] + '"]').prop('checked', true);
          }
        } else {
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          applyBackground(false);
          $('#start').show();
        }
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
  /// json variable to fetch the result of answer
    var studentAnswerJson = createJSON(questions,selections);

    var score = $('<p>', { id: 'question' });
    var subjectWisescores = {};
    var totalScore = 0;

    for (var i = 0; i < selections.length; i++) {

      scores = calculateScore(subjectWisescores, selections[i], questions[i]);

      if (selections[i] === questions[i].correctAnswer) {
        totalScore++;
      }
    }
    
    var resultElement = $('<div class="result"><p class="result-para">The Quiz Completed Successfully.</p><p class="result-para">We will get back to you with your child\'s assessment.</p><div>');
    score.append(resultElement);

    /*score.append('The Quiz Completed Successfully.');
    score.append('<br>');
    score.append('Your score card has been sent to your mail Id.');*/

    sendEmail(totalScore, subjectWisescores, studentAnswerJson);

    return score;
    
  }

  // Calculate Score for question
  function calculateScore(scores, selectedValue, question) {
    var subjectValue = question["subject"];
    var categoryValue = question["category"];


    if (question.questionType === questionTypes.objective) {
      if (subjectValue in scores) {

        var subjectObject = scores[subjectValue];
        var categoryObject = subjectObject["categories"];

        if (selectedValue === question.correctAnswer) {
          if (categoryValue in categoryObject) {
            categoryObject[categoryValue] = categoryObject[categoryValue] + 1;
          }
          else {
            categoryObject[categoryValue] = 1;
          }

          subjectObject["totalScore"] = subjectObject["totalScore"] + 1;
        }
      }
      else {
        if (selectedValue === question.correctAnswer) {
          scores[subjectValue] = {
            "totalScore": 1,
            "categories": {
              [categoryValue]: 1
            }
          };
        }
        else {
          scores[subjectValue] = {
            "totalScore": 0,
            "categories": {
              [categoryValue]: 0
            }
          };
        }
      }
    }

    return scores;
  }

  // Send Email
  function sendEmail(totalScore, scores, studentAnswerJson) {

    var parentName = $('#hdParentName').val();
    var contactNumber = $('#hdContactNumber').val();
    var email = $('#hdEmail').val();
    var childName = $('#hdStudentName').val();
    var childAge = $('#hdStudentAge').val();

     

    var scoreHTML = generateScoreTable(scores);

    var message = '<html><body><div class="form-fields">';
    message += '<p><b>Parent\'s Name:</b>' + parentName + '</p>'
    message += '<p><b>Child\'s Name:</b>' + childName + '</p>'
    message += '<p><b>Age Group:</b>' + studentAgeGroup + '</p>'
    message += '<p><b>Contact Number:</b>' + contactNumber + '</p>'
    message += '<p><b>Email ID:</b>' + email + '</p>'
   // message += '<h2 style="color:#000;">Hi ' + parentName + '!</h2>';
    //message += '<p style="color:#000;font-size:18px;">Total Score of your child <span style="color:#FB6200;"> ' + childName + '</span> is :<span style="color:#FB6200;"> ' + totalScore + '</span></p>';
    message += '<p style="font-size:16px; font-weight:600;">Score Details: <br>' + scoreHTML + '</p>';
    message += '<p><br>Note: This mail is sent using the PHP mail function.</p>';
    message += '</div></body></html>';

    var subject = 'Assessment|' + studentAgeGroup + '|' + contactNumber + '|' + childName;

    console.log(message);

    $.ajax({
      type: "POST",
      url: "SendEmail.php",
      data: "email=" + email + "&message=" + message + "&subject=" + subject + "&answerJson=" + studentAnswerJson + "&answerJsonFile=" + studentAnswerJsonFile,
    }).done(function (resp) {
      //alert( "Hello! " + resp );
    });
  }

  function generateScoreTable(scores) {
    var tableStyle = 'style="border-collapse:collapse;border-width:1px;border-style:solid;border-color:black;"';
    var tableHeaderStyle = 'style="border-width:1px;border-style:solid;border-color:black;padding:10px;text-align:left;width:150px"';
    var tableCellStyle = 'style="border-width:1px;border-style:solid;border-color:black;padding:10px;width:150px"';

    var scoreHTML = '<table ' + tableStyle + '>';
    scoreHTML += '<tr><th ' + tableHeaderStyle + '>Subject</th>';
    scoreHTML += '<th ' + tableHeaderStyle + '>Catageory</th>';
    scoreHTML += '<th ' + tableHeaderStyle + '>Category Wise Score</th>';
    scoreHTML += '<th ' + tableHeaderStyle + '>Total Score</th></tr>';

    for (const subject in scores) {
      var categoryArray = scores[subject]["categories"];
      var len = Object.keys(categoryArray).length;

      var firstCategory = true;
      for (category in categoryArray) {

        if (firstCategory) {
          scoreHTML += '<tr>';
          scoreHTML += '<th rowspan="' + len + '" ' + tableHeaderStyle + '>' + subject + '</th>';
          scoreHTML += '<th ' + tableHeaderStyle + '>' + category + '</th>';
          scoreHTML += '<td ' + tableCellStyle + '>' + categoryArray[category] + '</td>';
          scoreHTML += '<td rowspan="' + len + '" ' + tableCellStyle + '>' + scores[subject]["totalScore"] + '</td>';
          scoreHTML += '</tr>';
          firstCategory = false;
        }
        else {
          scoreHTML += '<tr>';
          scoreHTML += '<th ' + tableHeaderStyle + '>' + category + '</th>';
          scoreHTML += '<td ' + tableCellStyle + '>' + categoryArray[category] + '</td>';
          scoreHTML += '</tr>';
        }
      }

    }

    scoreHTML += '</table>';
    return scoreHTML;
  }

  function readJSONFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
        callback(rawFile.responseText);
      }
    }
    rawFile.send(null);
  }

  function createJSON(questions, selections) {
    var timestamp = new Date();
    var userAnswerJson = '{ "questions": [';
    for (var i = 0; i < selections.length; i++) {
      var isCorrectAnswer = 0;
      if(questions[i].correctAnswer === selections[i]){
        isCorrectAnswer = 1;
      }
      userAnswerJson += '{ "questionID": ' + (i + 1) + ', "question": "' + questions[i].question + '", "answerCorrect": ' +  isCorrectAnswer + ', "studentAnswer": "' + selections[i] + '", "correctAnswer": "' + questions[i].correctAnswer + '"}';
      if (i !== selections.length - 1) {
        userAnswerJson += ',';
      }
    }
    userAnswerJson += '], "timestamp": "' + timestamp + '"}';
    //console.log(userAnswerJson);

    //return userAnswerJson;
  }
})();
