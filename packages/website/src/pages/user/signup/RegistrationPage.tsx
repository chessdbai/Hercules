import React, { FC, useState } from 'react';
import {
  Layout,
  PageHeader,
  Steps
} from 'antd';
import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined
} from '@ant-design/icons';
import * as steps from './steps';

const { Step } = Steps;

type StepStatus = 'wait' | 'process' | 'finish' | 'error' | undefined;
type RegistrationStep = 'BasicInfo' | 'ConfirmContact' | 'SelectTier' | 'PaymentDetails' | 'Complete';

interface RegistrationPageProps {
  
}

const RegistrationPage : FC<RegistrationPageProps> = (p: RegistrationPageProps) => {

  let [step, setStep] = useState('BasicInfo' as RegistrationStep);


  const renderStep = () : React.ReactElement =>
  {
    if (step == 'BasicInfo') {
      return (
        <steps.BasicInfoPage />
      );
    } else {
      return <></>;
    }
  }

  var stepStatus : StepStatus[] = [];
  if (step === 'BasicInfo') {
    stepStatus.push('process');
    for (var i = 0; i < 4; i++) {
      stepStatus.push('wait');
    }
  } else if (step === 'ConfirmContact') {
    stepStatus.push('finish');
    stepStatus.push('process');
    for (var i = 0; i < 3; i++) {
      stepStatus.push('wait');
    }
  } else if (step === 'SelectTier') {
    stepStatus.push('finish');
    stepStatus.push('finish');
    stepStatus.push('process');
    stepStatus.push('wait');
    stepStatus.push('wait');
  } else if (step === 'PaymentDetails') {
    stepStatus.push('finish');
    stepStatus.push('finish');
    stepStatus.push('finish');
    stepStatus.push('process');
    stepStatus.push('wait');
  } else if (step === 'Complete') {
    stepStatus.push('finish');
    stepStatus.push('finish');
    stepStatus.push('finish');
    stepStatus.push('finish');
    stepStatus.push('process');
  }
  return (
    <Layout style={{height: '100%', width: '100%'}}>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Register"
        subTitle="What is ChessDB.ai?"
      />
      <Layout>

      </Layout>
      <Layout style={{height: '50', width: '100%'}}>
        <Steps>
          <Step status={stepStatus[0]} title="Basic Information" icon={<UserOutlined />} />
          <Step status={stepStatus[1]} title="Verification" icon={<SolutionOutlined />} />
          <Step status={stepStatus[2]} title="Membership Tier" icon={<LoadingOutlined />} />
          <Step status={stepStatus[3]} title="Payment" icon={<SmileOutlined />} />
          <Step status={stepStatus[4]} title="Complete" icon={<SmileOutlined />} />
        </Steps>
      </Layout>
    </Layout>
  )
}

export default RegistrationPage;