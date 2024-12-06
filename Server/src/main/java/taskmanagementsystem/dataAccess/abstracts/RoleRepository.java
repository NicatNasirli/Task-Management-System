package taskmanagementsystem.dataAccess.abstracts;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import taskmanagementsystem.entities.Role;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findById(int id);
    Role findByRole(String role);
}
