import { React, useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import testData from '../../data/test_data.json';

const ManageProfile = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    nickname: '',
  });

  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [alert, setAlert] = useState({
    show: false,
    variant: '',
    massage: '',
  });

  const [loading, setLoading] = useState(false);

  const showAlert = (variant, message) => {
    setAlert({
      show: true,
      variant,
      message,
    });
  };

  const fetchUserInfo = async () => {
    try {
      setLoading(true);

      const response = testData;
      // const response = await axios.get(
      // api.getUserInfo,
      // {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('token')}`,
      //   },
      // })

      setUserInfo({
        email: response.data.email,
        nickname: response.data.nickname,
      });
    } catch (error) {
      showAlert('danger', 'Failed to fetch user info. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUserInfoChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserInfo((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPassword((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = {
        status: 200,
      };

      // const response = await axios.put(
      //   api.updateUserInfo,
      //   {
      //     email: userInfo.email,
      //     nickname: userInfo.nickname,
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem('token')}`,
      //     },
      //   },
      // );
      // Check the response status and show appropriate alert

      if (response.status === 200) {
        // i18n 향후 수정 요청
        showAlert('success', 'Profile updated successfully!');
      } else {
        // i18n 향후 수정 요청
        showAlert('danger', 'Failed to update profile. Please try again later.');
      }
    } catch (error) {
      // i18n 향후 수정 요청
      showAlert('danger', 'Failed to update profile. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    console.log(password);

    if (password.newPassword !== password.confirmNewPassword) {
      // i18n 향후 수정 요청
      showAlert('danger', 'New passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      const response = {
        status: 200,
      };
      // const response = await axios.put(
      //   api.updatePassword,
      //   {
      //     currentPassword: passwords.currentPassword,
      //     newPassword: passwords.newPassword
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem('token')}`,
      //     },
      //   },
      // );

      // Reset password fields after successful update
      setPassword({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });

      // Check the response status and show appropriate alert
      if (response.status === 200) {
        // 비밀번호 변경 성공
        // i18n 향후 수정 요청
        showAlert('success', 'Password updated successfully!');
      } else if (response.status === 401) {
        // 현재 비밀번호가 유효하지 않을 경우
        // i18n 향후 수정 요청
        showAlert('danger', 'Current password is incorrect.');
      } else if (response.status === 400) {
        // 새 비밀번호가 유효하지 않을 경우
        // i18n 향후 수정 요청
        showAlert('danger', 'New password is invalid.');
      } else if (response.status === 409) {
        // 현재 비밀번호화 새 비밀번호가 같을 경우
        // i18n 향후 수정 요청
        showAlert('danger', 'New password cannot be the same as the current password.');
      } else {
        // 기타 오류 발생
        // i18n 향후 수정 요청
        showAlert('danger', 'Failed to update password. Please try again later.');
      }
    } catch (error) {
      // 비밀번호 변경 실패
      // i18n 향후 수정 요청
      showAlert('danger', 'Failed to update password. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container classname=''>
      <h1 className='text-center'>Manage Profile</h1>

      {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}

      <Card className='mb-4'>
        <Card.Header as='h5'>프로필 정보</Card.Header>
        <Card.Body>
          <Form onSubmit={handleProfileUpdate}>
            <Form.Group className='mb-3'>
              <Form.Label>이메일</Form.Label>
              <Form.Control
                type='email'
                name='email'
                value={userInfo.email}
                onChange={handleUserInfoChange}
                required
                disabled='true'
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>닉네임</Form.Label>
              <Form.Control
                type='text'
                name='nickname'
                value={userInfo.nickname}
                onChange={handleUserInfoChange}
                required
              />
            </Form.Group>

            <Button variant='primary' type='submit' disabled={loading}>
              {loading ? '업데이트 중...' : '프로필 업데이트'}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header as='h5'>비밀번호 변경</Card.Header>
        <Card.Body>
          <Form onSubmit={handlePasswordUpdate}>
            <Form.Group className='mb-3'>
              <Form.Label>현재 비밀번호</Form.Label>
              <Form.Control
                type='password'
                name='currentPassword'
                value={password.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>새 비밀번호</Form.Label>
              <Form.Control
                type='password'
                name='newPassword'
                value={password.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>새 비밀번호 확인</Form.Label>
              <Form.Control
                type='password'
                name='confirmNewPassword'
                value={password.confirmNewPassword}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>

            <Button variant='primary' type='submit' disabled={loading}>
              {loading ? '변경 중...' : '비밀번호 변경'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ManageProfile;
