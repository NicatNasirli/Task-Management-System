package taskmanagementsystem.business.abstracts;

import org.springframework.stereotype.Service;
import taskmanagementsystem.business.requests.CreateRoleRequest;
import taskmanagementsystem.business.responses.GetRoleResponse;

import java.util.List;

@Service
public interface RoleService {
    void add(CreateRoleRequest createRoleRequest);
    GetRoleResponse getById(int id);
    List<GetRoleResponse> getAll();
    GetRoleResponse getByRole(String role);
}
