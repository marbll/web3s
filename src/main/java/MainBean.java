import javax.faces.bean.ManagedBean;

@ManagedBean(name = "mainBean")
public class MainBean {
    private String x;
    private String y;
    private String r;

    public String getX() {
        return x;
    }
    public String getY() {
        return y;
    }
    public String getR() {
        return r;
    }

    public void setX(String x) {
        this.x = x;
    }
    public void setY(String y) {
        this.y = y;
    }
    public void setR(String r) {
        this.r = r;
    }
}
