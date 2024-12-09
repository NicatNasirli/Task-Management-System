package taskmanagementsystem.business.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import taskmanagementsystem.entities.Task;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetUserResponse {
    private Long id;
    private String name;
    private String email;
    private String username;
    private String password;
    private List<Task> tasks;
}
