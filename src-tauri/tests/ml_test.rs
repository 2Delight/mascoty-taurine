use mascoty_taurine::mascot::argmax;
use mascoty_taurine::mascot::to_bw;

use tch::Tensor;

#[test]
fn check_to_bw() {
    assert_eq!(
        to_bw(Tensor::zeros(
            &[3, 10, 10],
            (tch::Kind::Float, tch::Device::Cpu)
        )),
        Tensor::zeros(&[1, 10, 10], (tch::Kind::Float, tch::Device::Cpu)),
    );

    assert_eq!(
        to_bw(Tensor::ones(
            &[3, 10, 10],
            (tch::Kind::Float, tch::Device::Cpu)
        )),
        Tensor::ones(&[1, 10, 10], (tch::Kind::Float, tch::Device::Cpu)),
    );
}

#[test]
fn check_argmax() {
    let arr = [2f64, 1f64, 4f64, 3f64, 6f64, 5f64];
    assert!(argmax(&arr) == 4u8);
}
