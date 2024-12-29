package taskmanagementsystem.business.requests;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import taskmanagementsystem.entities.Priority;

import java.time.LocalDate;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateTaskRequest {
    private Long id;
    private String title;
    private String description;
    private LocalDate deadline;
    private String status;
    @Enumerated(EnumType.STRING)
    private Priority priority;
}
