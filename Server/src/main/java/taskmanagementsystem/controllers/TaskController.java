package taskmanagementsystem.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import taskmanagementsystem.business.abstracts.TaskService;
import taskmanagementsystem.business.requests.CreateTaskRequest;
import taskmanagementsystem.business.requests.UpdateTaskRequest;
import taskmanagementsystem.business.responses.GetTaskResponse;

import java.util.List;


@AllArgsConstructor
@RestController
@RequestMapping("api/task")
public class TaskController {
    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<String> add(@RequestBody CreateTaskRequest createTaskRequest) {
        this.taskService.add(createTaskRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body("Task created!");
    }

    @GetMapping
    public ResponseEntity<List<GetTaskResponse>> getAll() {
        return ResponseEntity.ok(this.taskService.getAll());
    }

    @DeleteMapping("/deleteAllByUserId/{userId}")
    public ResponseEntity<String> deleteTasksByUserId(@PathVariable int userId) {
        this.taskService.deleteAllByUser(userId);
        return new ResponseEntity<>("All Tasks are Deleted!", HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateTaskStatus(@PathVariable int id, @RequestParam String status) {
        this.taskService.updateTaskStatusById(id, status);
        return ResponseEntity.ok("Task Updated!");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateTask(@RequestBody UpdateTaskRequest updateTaskRequest){
        this.taskService.updateTask(updateTaskRequest);
        return ResponseEntity.ok("Task Updated!");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTaskById(@PathVariable int id){
        this.taskService.deleteTaskById(id);
        return ResponseEntity.ok("Task Deleted");
    }

    @DeleteMapping("/deleteAllByStatus/{userId}")
    public ResponseEntity<String> deleteAllTaskByUserAndStatus(@PathVariable int userId,
                                                               @RequestParam String status){

        this.taskService.deleteAllTaskByUserAndStatus(userId, status);
        return ResponseEntity.ok("Successfully deleted!");
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetTaskResponse> getTaskById(@PathVariable int id){
        return ResponseEntity.ok(this.taskService.getTaskById(id));
    }

}
