var app = angular.module('gradebook',[]); //create module with no dependences
//can attach module to any part of the page

//define a controller, behind scene is a constructor function
app.controller('GradebookController',function($scope,gradesApi,gradeStats){
//    //role of view model responsible for preparing data to get rendered
//    $scope.greeting = "Hello"; //scope is way to get html through the controller

   // $scope.students = []; //directives help us to navigate data into certain tags
//    $http.get('grades.json').then(function(fun){
//        $scope.students = fun.data;
//    });

    $scope.students = [];

    gradesApi.all().then(function(fun){
        $scope.students = fun.data;



    });
    //watch allows us to watch anything on scope, and if something happens rerun the function
    $scope.$watch('students',function(){ //whenever students changes, bind again, and rerun
        $scope.gradeAverage = gradeStats.getAverage($scope.students);
        $scope.gradeLowest = gradeStats.getLowest($scope.students);
        console.log($scope.gradeLowest);
        $scope.gradeHighest = gradeStats.getHighest($scope.students);
        console.log($scope.gradeHighest);
    }, true);


    $scope.addStudent = function(){
        //now let's append to students, new item has been added and should automatically add
        $scope.students.push({
            first: $scope.first,
            last: $scope.last,
            grade: $scope.grade
        });
        $scope.first = null;
        $scope.last = null;
        $scope.grade = null;
    }; //create function on scope


});
//services below
app.factory('gradesApi',function($http){
    //allow us to return custom object
    return {
        all: function(){
            return $http.get('grades.json');
        }
    }//for the all thing

}); //how to attach services

app.factory('gradeStats',function(){
    function getAverage(students){
        var sum = 0;

        students.forEach(function(student){
           sum += student.grade;
        });

        return sum/students.length;
    }
    function getLowest(students){
        if(students.length > 0){
        var low = students[0].grade;

        students.forEach(function(student){
        //low = student.grade[0];

           if(student.grade < low){
                low = student.grade;
           }
        });
        //console.log(low);
        return low;
        }
    }
    function getHighest(students){
        if(students.length > 0){
        var high = students[0].grade;

        students.forEach(function(student){
        //high = student.grade[0];

           if(student.grade > high){
                high = student.grade;
           }
        });

        return high;
        }
    }    
    return{
        getAverage: getAverage,
        getLowest: getLowest,
        getHighest: getHighest

    }
});

