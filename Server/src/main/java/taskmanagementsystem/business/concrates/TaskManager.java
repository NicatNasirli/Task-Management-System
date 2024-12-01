package taskmanagementsystem.business.concrates;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import taskmanagementsystem.business.abstracts.TaskService;
import taskmanagementsystem.business.requests.CreateTaskRequest;
import taskmanagementsystem.business.responses.GetTaskResponse;
import taskmanagementsystem.dataAccess.abstracts.TaskRepository;
import taskmanagementsystem.entities.Task;
import taskmanagementsystem.utilities.mapper.ModelMapperService;

import java.util.List;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class TaskManager implements TaskService {
    private final TaskRepository taskRepository;
    private final ModelMapperService modelMapperService;

    @Override
    public void add(CreateTaskRequest createTaskRequest) {
        Task task = this.modelMapperService.
                forRequest()
                .map(createTaskRequest, Task.class);

        this.taskRepository.save(task);
    }

    @Override
    public List<GetTaskResponse> getAll() {
        List<Task> tasks = this.taskRepository.findAll();

         return tasks.stream()
                .map(task -> this.modelMapperService
                        .forResponse()
                        .map(task, GetTaskResponse.class))
                .collect(Collectors.toList());
    }
}
