package taskmanagementsystem.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import taskmanagementsystem.business.abstracts.TaskService;
import taskmanagementsystem.business.requests.CreateTaskRequest;
import taskmanagementsystem.business.responses.GetTaskResponse;

import java.util.List;


@AllArgsConstructor
@RestController()
@RequestMapping("api/task")
public class TaskController {
    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<String> add(@RequestBody CreateTaskRequest createTaskRequest) {
        this.taskService.add(createTaskRequest);
        return new ResponseEntity<>("Task created!", HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<GetTaskResponse>> getAll() {
        return ResponseEntity.ok(this.taskService.getAll());
    }

}
