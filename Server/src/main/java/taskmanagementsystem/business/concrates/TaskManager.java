package taskmanagementsystem.business.concrates;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import taskmanagementsystem.business.abstracts.TaskService;
import taskmanagementsystem.business.requests.CreateTaskRequest;
import taskmanagementsystem.business.requests.UpdateTaskRequest;
import taskmanagementsystem.business.responses.GetTaskResponse;
import taskmanagementsystem.dataAccess.abstracts.TaskRepository;
import taskmanagementsystem.dataAccess.abstracts.UserRepository;
import taskmanagementsystem.entities.Task;
import taskmanagementsystem.entities.User;
import taskmanagementsystem.utilities.mapper.ModelMapperService;

import java.util.List;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class TaskManager implements TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ModelMapperService modelMapperService;


    @Override
    public void add(CreateTaskRequest createTaskRequest) {
        User user = this.userRepository.findById(createTaskRequest.getUserId()).get();
        Task task = new Task();
        task.setTitle(createTaskRequest.getTitle());
        task.setDescription(createTaskRequest.getDescription());
        task.setDeadline(createTaskRequest.getDeadline());
        task.setPriority(createTaskRequest.getPriority());
        task.setStatus(createTaskRequest.getStatus());
        task.setUser(user);
        this.taskRepository.save(task);
    }

    @Override
    public List<GetTaskResponse> getAll() {
        List<Task> tasks = this.taskRepository.findAll();
        if (tasks.isEmpty()) {
            throw new RuntimeException("Task entity is empty");
        } else return tasks.stream()
                .map(task -> this.modelMapperService
                        .forResponse()
                        .map(task, GetTaskResponse.class))
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void deleteAllByUser(int userId) {
        User user = this.userRepository.findById(userId);
        if (user == null){
            throw new RuntimeException("User does not exists!");
        }else this.taskRepository.deleteAllByUser(user);
    }

    @Override
    public void updateTaskStatusById(int id, String status) {
        boolean ifTaskExists = this.taskRepository.findById((long)id).isPresent();
        if (!ifTaskExists){
            throw new RuntimeException("Task does not exists!");
        }else {
            Task task = this.taskRepository.findById((long)id).get();
            task.setStatus(status);
            this.taskRepository.save(task);
        }
    }

    @Override
    public void deleteTaskById(int id) {
        Task task = this.taskRepository.findById((long)id).get();
        this.taskRepository.delete(task);
    }

    @Transactional
    @Override
    public void deleteAllTaskByUserAndStatus(int userId, String status) {
        User user = this.userRepository.findById(userId);
        this.taskRepository.deleteAllByUserAndStatus(user, status);
    }

    @Override
    public GetTaskResponse getTaskById(int id) {
        boolean ifTaskExists = this.taskRepository.findById((long)id).isPresent();
        if (!ifTaskExists){
            throw new RuntimeException("Task does not exists!");
        }else {
            Task task = this.taskRepository.findById((long)id).get();
            return this.modelMapperService
                    .forResponse()
                    .map(task, GetTaskResponse.class);
        }
    }

    @Override
    public void updateTask(UpdateTaskRequest updateTaskRequest) {
        boolean ifTaskExists = this.taskRepository.findById(updateTaskRequest.getId()).isPresent();
        if (!ifTaskExists){
            throw new RuntimeException("Task does not exists!");
        }else {
            Task task = this.taskRepository.findById(updateTaskRequest.getId()).get();
            task.setTitle(updateTaskRequest.getTitle());
            task.setDescription(updateTaskRequest.getDescription());
            task.setDeadline(updateTaskRequest.getDeadline());
            task.setPriority(updateTaskRequest.getPriority());
            task.setStatus(updateTaskRequest.getStatus());
            this.taskRepository.save(task);
        }
    }
}
