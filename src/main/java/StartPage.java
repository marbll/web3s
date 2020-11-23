import javax.faces.bean.ManagedBean;
import java.time.LocalDate;

@ManagedBean(name = "start")
public class StartPage {
    public String getDate(){
        return LocalDate.now().toString();
    }
}
