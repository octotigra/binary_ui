(function($){

var Model = function(obj) {
    return obj;
}

var Controller = function(obj) {
    
    //render on creation
    $("#student-container").append(obj.render());
    
    //add listener
    $("#student-exams-button").on("click", function() {
       obj.updateExams();
    });

 //   this approach didn't work out. Invocation string as function works in global scope
 //   $("#student-exams-button").click(obj["clickHandlers"]["#student-exams-button"])();
    

    //render changes
    setInterval(ifExamsChanged, 100);

    function ifExamsChanged() {
        
        if (obj.model.changed) {
            $("#exams").empty();
            $("#exams").append(obj.renderExams());
            obj.model.changed = false;
        }
    }
    
    return obj;
} 

var Student = new Model({
    name: 'Piotr',
    age: 22,
    year: 5,
    examsTaken: 2,
    changed: false,
    takeExam: function(){
        this.examsTaken++;
        this.changed = true;
    }
});

var StudentController = new Controller({
    model: Student,
    elementId: 'student-container',
    
    render: function(){

        return "<span>"+ this.model.name + "</span>" 
                + "<span id='exams'>" + "Exams taken: "+ this.model.examsTaken + "</span>"
                + "<button id='student-exams-button'> " 
                + "Increase exams taken</button>";
    },
    renderExams: function(){
        
        return  "<span id='exams'>" + "Exams taken: "+ this.model.examsTaken + "</span>";
    },
    clickHandlers: {
        '#student-exams-button': 'updateExams'
    },
    updateExams: function(){
        this.model.takeExam();
    }
    
});

})(jQuery);
