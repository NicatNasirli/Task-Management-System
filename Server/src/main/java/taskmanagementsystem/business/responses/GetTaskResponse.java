package taskmanagementsystem.business.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetTaskResponse {
    private Long id;
    private String title;
    private String description;
    private LocalDate deadline;
    private String status;
    private String priority;
}
