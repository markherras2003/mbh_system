import JobOrder from "../models/JobOrder.js";

/* Get user value by ID */
export const getJobOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const joborders = await JobOrder.findById(id);
    res.status(200).json(joborder);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* Get all users */
export const getJobOrders = async (req, res) => {
  try {
    const joborders = await JobOrder.find();
    const responseData = {
      data: joborders.map(joborder => ({
        id: joborder._id,
        job_id: joborder.job_id,
        client_name: joborder.client_name,
        unit_description: joborder.unit_description,
        unit_model: joborder.unit_model,
        unit_accessories: joborder.unit_accessories,
        unit_problem: joborder.unit_problem,
        resolution: joborder.resolution,
        received_by: joborder.received_by,
        job_order_by: joborder.job_order_by,
        tech_incharge: joborder.tech_incharge
      }))
    };
    res.status(200).json(responseData);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


/* Job Order Execution */
export const saveJobOrder = async (req, res) => {
  try {
    const lastJobOrder = await JobOrder.findOne().sort({ job_id: -1 });
    const nextJobId = lastJobOrder ? lastJobOrder.job_id + 1 : 1001;

    const {
      client_name,
      unit_description,
      unit_model,
      unit_accessories,
      unit_problem,
      resolution,
      received_by,
      job_order_by,
      tech_incharge,
    } = req.body;

    const newJobOrder = new JobOrder({
      job_id: nextJobId,
      client_name,
      unit_description,
      unit_model,
      unit_accessories,
      unit_problem,
      resolution,
      received_by,
      job_order_by,
      tech_incharge,
    });

    const savedJob = await newJobOrder.save();
    res.status(200).json(savedJob);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* Update Job Order Execution */
export const updateJobOrder = async (req, res) => {
  try {
    const {
      client_name,
      unit_description,
      unit_model,
      unit_accessories,
      unit_problem,
      resolution,
      received_by,
      job_order_by,
      tech_incharge,
    } = req.body;

    const updateJobOrders = {
      client_name,
      unit_description,
      unit_model,
      unit_accessories,
      unit_problem,
      resolution,
      received_by,
      job_order_by,
      tech_incharge,
    };

    const saveJob = await JobOrder.findByIdAndUpdate(req.params._id, updateJobOrders, { new: true });
    if (!saveJob) {
      // Return an error response if the user is not found
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(saveJob);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};